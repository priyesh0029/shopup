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
      console.log("customr product page details : ", catId, userID);
      const user = await User.findOne({ _id: userID }, { _id: 0, location: 1 });

      if (!user || !user.location) {
        throw new Error("User location not found");
      }

      const radiusInKm = 10;
      const radiusInRadians = radiusInKm / 6378.1;

      const products = await ShopOwner.aggregate([
        {
          $geoNear: {
            near: {
              type: "Point",
              coordinates: user.location.coordinates,
            },
            distanceField: "distance",
            maxDistance: radiusInRadians * 6378.1 * 1000,
            spherical: true,
            query: {
              isBlock: false,
            },
          },
        },
        {
          $addFields: {
            distanceInKilometers: {
              $divide: ["$distance", 1000],
            },
          },
        },

        {
          $lookup: {
            from: "products",
            localField: "username",
            foreignField: "shopOwnerId",
            as: "products",
          },
        },
        {
          $unwind: "$products",
        },
        {
          $match: {
            "products.categoryId": catId,
            "products.isDeleted": false,
          },
        },
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

      console.log("result of userpage products after aggrgation : ", products);
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

  //to get all product search

  getallProductSearch: expressAsyncHandler(async (req, res) => {
    try {
      const userId = req.query.userId;
      const { product } = req.query;
      const userID = new mongoose.Types.ObjectId(userId);
      const user = await User.findOne({ _id: userID }, { _id: 0, location: 1 });

      if (!user || !user.location) {
        throw new Error("User location not found");
      }

      const radiusInKm = 10;
      const radiusInRadians = radiusInKm / 6378.1;

      const products = await ShopOwner.aggregate([
        {
          $geoNear: {
            near: {
              type: "Point",
              coordinates: user.location.coordinates,
            },
            distanceField: "distance",
            maxDistance: radiusInRadians * 6378.1 * 1000,
            spherical: true,
            query: {
              isBlock: false,
            },
          },
        },
        {
          $addFields: {
            distanceInKilometers: {
              $divide: ["$distance", 1000],
            },
          },
        },

        {
          $lookup: {
            from: "products",
            localField: "username",
            foreignField: "shopOwnerId",
            as: "products",
          },
        },
        {
          $unwind: "$products",
        },
        {
          $match: {
            "products.isDeleted": false,
            "products.caption": { $regex: product, $options: "i" },
          },
        },
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

      console.log("result of userpage products after aggrgation : ", products);
      return res.status(201).json({
        success: true,
        message: "fetch categories successfully",
        data: products,
      });
    } catch (error) {
      console.error("Error gettig cat:", error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }),

  // add products to users cart
  addToCart : expressAsyncHandler(async (req, res) => {
    try {
      const { userId } = req.query;
      const {proId} = req.body
      const userID = new mongoose.Types.ObjectId(userId);
      console.log("product id from fronted : ",proId);
      // First, check if the product exists in the cart
      const user = await User.findOne({ _id: userID });
  
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
  
      const productIndex = user.cart.findIndex(item => item.productId === proId);
  
      if (productIndex > -1) {
        // Product exists in the cart, increase the count
        await User.updateOne(
          { _id: userID, 'cart.productId': proId },
          { $inc: { 'cart.$.count': 1 } }
        );
      } else {
        // Product does not exist in the cart, add it with count 1
        await User.updateOne(
          { _id: userID },
          { $push: { cart: { productId: proId, count: 1 } } }
        );
      }
  
      return res.status(201).json({
        success: true,
        message: "Item carted successfully",
        data: true,
      });
  
    } catch (error) {
      console.error("Error adding product to cart:", error);
      return res.status(500).json({ success: false, message: "Internal server error" });
    }
  }),

  // get all  products from users cart
  getallCartList : expressAsyncHandler(async (req, res) => {
    try {
      const { userId } = req.query;
      const userID = new mongoose.Types.ObjectId(userId);
      const user = await User.findOne({ _id: userID });
  
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
  
     const cart = await User.aggregate([
      {
        $match:
          {
            _id: userID
          },
      },
      {
        $unwind:
          {
            path: "$cart",
          },
      },
      {
        $addFields:
          {
            proId: {
              $toObjectId: "$cart.productId",
            },
          },
      },
      {
        $lookup: {
          from: "products",
          localField: "proId",
          foreignField: "_id",
          as: "products",
        },
      },
      {
        $unwind: {
          path: "$products",
        },
      },
      {
        $project:
          {
            _id: 1,
            name: 1,
            number: 1,
            email: 1,
            address: 1,
            location: "$location.coordinates",
            quantity : "$cart.count",
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
    ])

    console.log("result of cart results after aggregation : ", cart);
      return res.status(201).json({
        success: true,
        message: "Item carted successfully",
        data: cart,
      });
  
    } catch (error) {
      console.error("Error adding product to cart:", error);
      return res.status(500).json({ success: false, message: "Internal server error" });
    }
  }),
  
};
