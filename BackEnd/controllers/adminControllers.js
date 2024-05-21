import Category from "../models/categoryModal.js";
import asyncHandler from "express-async-handler";


export const adminController = {
    createCategory: asyncHandler(async (req, res) => {
      try {
        let media = req?.file;
        console.log("media : ",media);
        let filename;
        if (media !== undefined) {
          filename = media.filename
        }
        const { caption } = req.body;
        
        console.log("createCategory details : ",caption,filename)
        const categoryDetails = {
          caption: caption,
          imgNames: filename,
        };
  
        const newPost = new Category(categoryDetails);
        await newPost.save();
        adminController
        return res.status(201).json({
          success: true,
          message: "Post created successfully",
          data: newPost,
        });
      } catch (error) {
        console.error("Error creating post:", error);
        return res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      }
    }),

    //to get all category details 

    getCategory : asyncHandler(async (req, res) => {
      try {
        const categories = await Category.find({isDeleted:false})
        console.log("categories : ",categories);
        return res.status(201).json({
          success: true,
          message: "fetch categories successfully",
          data: categories,
        });
      } catch (error) {
        console.error("Error gettig cat:", error);
        return res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      }
    }),

}