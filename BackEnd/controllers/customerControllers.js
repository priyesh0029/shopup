import expressAsyncHandler from "express-async-handler";
import User from "../models/User.js";
import mongoose from "mongoose";
import ShopOwner from "../models/shopOwner.js";

export const customerControllers = {
  //TO SAVE USER LOCATION
  saveUserLocation: expressAsyncHandler(async (req, res) => {
    const location = req.body;
    const userId = req.query.userId;
    console.log("req body of locationUpdate 111 : ", userId, req.body);
    if (!userId || !location) {
      return res.status(400).json({
        success: false,
        message: "UserId and location are required.",
      });
    }

    try {
      const userID = new mongoose.Types.ObjectId(userId);
      const locationUpdate = await User.updateOne(
        { _id: userID },
        {
          $set: {
            location: {
              type: "Point",
              coordinates: [
                parseFloat(location.longitude),
                parseFloat(location.latitude),
              ],
            },
          },
        }
      );

      console.log("req body of locationUpdate: ", userID, locationUpdate);

      if (locationUpdate.modifiedCount === 1) {
        return res.status(201).json({
          success: true,
          message: "Location updated successfully.",
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "Unable to save customer location details. Try again.",
        });
      }
    } catch (error) {
      console.error("Error updating location: ", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error. Please try again later.",
      });
    }
  }),

  //TO GET USER PRODUCT LIST
  getUserProductsList: expressAsyncHandler(async (req, res) => {
    try {
      const userId = req.query.userId;
      const { catId } = req.params;
      const userID = new mongoose.Types.ObjectId(userId);
      console.log("customr product page details : ",catId,userID);
      const user = await User.findOne({ _id: userID }, { _id: 0, location: 1 });
    
      if (!user || !user.location) {
        throw new Error('User location not found');
      }
    
      const radiusInKm = 10;
      const radiusInRadians = radiusInKm / 6378.1;
    
      const products = await ShopOwner.aggregate([
        {
          $geoNear: {
            near: {
              type: 'Point',
              coordinates: user.location.coordinates
            },
            distanceField: 'distance',
            maxDistance: radiusInRadians * 6378.1 * 1000,
            spherical: true,
          },
        },
        {
          $addFields: {
            distanceInKilometers: {
              $divide: ['$distance', 1000],
            },
          },
        },
        {
          $lookup: {
            from: 'products',
            localField: 'username',
            foreignField: 'shopOwnerId',
            as: 'products',
          },
        },
        {
          $unwind: '$products' 
        },
        {
          $match: {
            'products.categoryId': catId,
          },
        },
        // {
        //   $group: {
        //     _id: '$_id',
        //     name: { $first: '$name' },
        //     number: { $first: '$number' },
        //     email: { $first: '$email' },
        //     address: { $first: '$address' },
        //     location: { $first: '$location.coordinates' },
        //     createdAt: { $first: '$createdAt' },
        //     distanceInKm: { $first: '$distanceInKilometers' },
        //     products: { $push: '$products' },
        //   },
        // },
        {
          $project: {
            _id: 1,
            name: 1,
            number: 1,
            email: 1,
            address: 1,
            location: "$location.coordinates",
            createdAt: 1,
            distanceInKm: "$distanceInKilometers",
            productId: "$products._id",
            shopOwnerUname: "$products.shopOwnerId",
            categoryId: "$products.categoryId",
            caption: "$products.caption",
            description: "$products.description",
            price: "$products.price",
            imgNames: "$products.imgNames",
            productCreatedAt: "$products.createdAt",
          },
        },
      ]);
    
      console.log("result of userpage products after aggrgation : ",products);
      return res.status(200).json({
        status: "success",
        products,
      });
    } catch (error) {
      console.error(error);
      console.error("Error fetching all posts:", error);
      res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
    
  }),
};
