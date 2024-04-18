import User from "../models/User.js";
import Post from "../models/postModal.js";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import AppError from "../utilities/appError.js";


export const postController = {
  createPost: asyncHandler(async (req, res) => {
    try {
      let media = req?.files;
      let filenames;
      if (media !== undefined && media.length !== 0) {
        filenames = media.map((element) => element.filename);
      }
      const userId = req.query.userId;
      const { caption, description } = req.body;

      if (typeof userId !== "string") {
        return res
          .status(400)
          .json({ success: false, message: "Invalid user ID" });
      }

      const userID = new mongoose.Types.ObjectId(userId);
      const user = await User.findOne({ _id: userID }, { _id: 0, username: 1 });

      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      const postDetails = {
        postedUser: user.username,
        caption: caption,
        description: description,
        imgNames: filenames,
      };

      const newPost = new Post(postDetails);
      await newPost.save();

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

  //TO GET ALL POSTS

  getAllPost: asyncHandler(async (req, res) => {
    try {
      const allPosts = await Post.aggregate([
        {
          $match: {
            postDeleted: false,
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "postedUser",
            foreignField: "username",
            as: "results",
          },
        },
        {
          $unwind: {
            path: "$results",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            _id: 1,
            postedUser: 1,
            description: 1,
            caption: 1,
            imgNames: 1,
            isBlocked: 1,
            createdAt: 1,
            updatedAt: 1,
          },
        },
        {
          $group: {
            _id: "$_id",
            postedUser: {
              $first: "$postedUser",
            },
            description: {
              $first: "$description",
            },
            imgNames: {
              $first: "$imgNames",
            },
            caption: {
              $first: "$caption",
            },
            createdAt: {
              $first: "$createdAt",
            },
            updatedAt: {
              $first: "$updatedAt",
            },
          },
        },
        {
          $project: {
            _id: 1,
            postedUser: 1,
            description: 1,
            imgNames: 1,
            caption: 1,
          },
        },
      ]);

      console.log("Controllers all post response:", allPosts);

      res.status(200).json({
        status: "success",
        allPosts,
      });
    } catch (error) {
      console.error("Error fetching all posts:", error);
      res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }),

  //to edit post

  updatePost: asyncHandler(async (req, res) => {
    const { caption, description, postId } = req.body;

    const post = await Post.findById(postId);
    if (!post) {
      res.status(404).json({ success: false, error: "Post not found" });
      return;
    }
    post.caption = caption;
    post.description = description;
    try {
      const updatedPost = await post.save();
      res.status(200).json({ success: true, data: updatedPost });
    } catch (error) {
      if (error.name === "ValidationError") {
        const errors = Object.values(error.errors).map((err) => err.message);
        res.status(400).json({ success: false, error: errors });
      } else {
        res
          .status(500)
          .json({ success: false, error: "Internal Server Error" });
      }
    }
  }),

  //to delete post
  deletePost: asyncHandler(async (req, res) => {
    const { postId } = req.body;

    if (typeof postId !== "string") {
      throw new AppError(`Invalid postId. Please provide a valid postId.`, 400);
    }
    try {
      const postID = new mongoose.Types.ObjectId(postId);
      const deletedPost = await Post.updateOne(
        { _id: postID },
        { $set: { postDeleted: true } }
      );
      if (deletedPost.nModified === 0) {
        throw new AppError(
          `Post with id ${postId} not found or already deleted.`,
          404
        );
      }
      res.status(200).json({
        status: "success",
        deletedPostId: postId,
      });
    } catch (error) {
      if (error instanceof mongoose.Error.CastError) {
        throw new AppError(
          `Invalid postId format. Please provide a valid postId.`,
          400
        );
      } else {
        throw new AppError(`Error while deleting post. Please try again.`, 500);
      }
    }
  }),
};
