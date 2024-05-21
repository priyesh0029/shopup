import expressAsyncHandler from "express-async-handler";
import User from "../models/User.js";
import mongoose from "mongoose";

export const customerControllers = {
  //TO SAVE USER LOCATION
  saveUserLocation: expressAsyncHandler(async (req, res) => {
    const location  = req.body;
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
        { $set: { location: location } }
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
  })
};
