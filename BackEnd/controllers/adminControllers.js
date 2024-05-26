import Category from "../models/categoryModal.js";
import asyncHandler from "express-async-handler";
import ShopOwner from "../models/shopOwner.js";
import User from "../models/User.js";
import Product from "../models/productModal.js";

export const adminController = {
  createCategory: asyncHandler(async (req, res) => {
    try {
      let media = req?.file;
      console.log("media : ", media);
      let filename;
      if (media !== undefined) {
        filename = media.filename;
      }
      const { caption } = req.body;

      console.log("createCategory details : ", caption, filename);
      const categoryDetails = {
        caption: caption,
        imgNames: filename,
      };

      const newPost = new Category(categoryDetails);
      await newPost.save();
      adminController;
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

  getCategory: asyncHandler(async (req, res) => {
    try {
      const categories = await Category.find({ isDeleted: false });
      console.log("categories : ", categories);
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

  //to get admin dashboard details
  getAdminDashboard: asyncHandler(async (req, res) => {
    try {
      const totalUsers = await User.countDocuments();
      console.log(totalUsers);

      const totalShopOwners = await ShopOwner.countDocuments();
      console.log(totalShopOwners);

      const totalCategories = await Category.countDocuments();
      console.log(totalCategories);

      const totalProducts = await Product.countDocuments();
      console.log(totalProducts);

      const dashboardDetails = [
        { "Total Users": totalUsers },
        { "Total Shopowners": totalShopOwners },
        { "Total Categories": totalCategories },
        { "Total Products": totalProducts },
      ];
      return res.status(201).json({
        status: true,
        message: "Fetched dashboard details successfully",
        data: dashboardDetails,
      });
    } catch (error) {
      console.error("Error getting dashboard details:", error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }),

  //to get number of user registrations per week
  getUserRegPerWeeek: asyncHandler(async (req, res) => {
    try {
      function getStartAndEndOfWeek() {
        const currentDate = new Date(); // Current date
        const dayOfWeek = currentDate.getUTCDay(); // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)

        const startOfWeek = new Date(currentDate); // Clone the current date
        const endOfWeek = new Date(currentDate); // Clone the current date

        // Calculate the start of the week (Sunday)
        startOfWeek.setUTCDate(currentDate.getUTCDate() - dayOfWeek);
        startOfWeek.setUTCHours(0, 0, 0, 0);

        // Calculate the end of the week (Saturday)
        endOfWeek.setUTCDate(startOfWeek.getUTCDate() + 6);
        endOfWeek.setUTCHours(23, 59, 59, 999);

        return { startOfWeek, endOfWeek };
      }

      // Example of how to use the function:
      const { startOfWeek, endOfWeek } = getStartAndEndOfWeek();

      console.log("Start of the week:", startOfWeek.toISOString()); // Sunday
      console.log("End of the week:", endOfWeek.toISOString());

      const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];

      // Perform the aggregation
      const aggregationPipeline = await User.aggregate([
        {
          $match: {
            createdAt: {
              $gte: startOfWeek,
              $lt: endOfWeek,
            },
          },
        },
        {
          $group: {
            _id: {
              $switch: {
                branches: [
                  {
                    case: { $eq: [{ $dayOfWeek: "$createdAt" }, 1] },
                    then: "Sunday",
                  },
                  {
                    case: { $eq: [{ $dayOfWeek: "$createdAt" }, 2] },
                    then: "Monday",
                  },
                  {
                    case: { $eq: [{ $dayOfWeek: "$createdAt" }, 3] },
                    then: "Tuesday",
                  },
                  {
                    case: { $eq: [{ $dayOfWeek: "$createdAt" }, 4] },
                    then: "Wednesday",
                  },
                  {
                    case: { $eq: [{ $dayOfWeek: "$createdAt" }, 5] },
                    then: "Thursday",
                  },
                  {
                    case: { $eq: [{ $dayOfWeek: "$createdAt" }, 6] },
                    then: "Friday",
                  },
                  {
                    case: { $eq: [{ $dayOfWeek: "$createdAt" }, 7] },
                    then: "Saturday",
                  },
                ],
                default: "Unknown",
              },
            },
            count: { $sum: 1 },
          },
        },
      ]);

      // Create a map for faster lookups
      const resultMap = new Map(
        aggregationPipeline.map((item) => [item._id, item])
      );

      // Merge results with all days of the week
      const mergedResults = daysOfWeek.map((day) => ({
        _id: day,
        count: (resultMap.get(day) || { count: 0 }).count,
      }));

      console.log("aggregationPipeline:", mergedResults);
      return res.status(201).json({
        status: true,
        message: "fetch categories successfully",
        data: mergedResults,
      });
    } catch (error) {
      console.error("Error gettig cat:", error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }),

  //to get admin dashboard user count for yarly graph
  getYearlyUserCount: asyncHandler(async (req, res) => {
    try {
      const monthsOfYear = Array.from({ length: 12 }, (_, i) => i + 1); // Array representing months 1 to 12

      const aggregationPipeline = await User.aggregate([
        {
          $match: {
            createdAt: {
              $gte: new Date(new Date().getFullYear(), 0, 1), // Start of the current year
              $lt: new Date(new Date().getFullYear() + 1, 0, 1), // Start of the next year
            },
          },
        },
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" }, // Extract the year
              month: { $month: "$createdAt" }, // Extract the month
            },
            count: { $sum: 1 }, // Count the number of users in each group
          },
        },
        {
          $sort: { "_id.year": 1, "_id.month": 1 }, // Sort the results by year and month
        },
      ]);

      const resultWithZeroCounts = monthsOfYear.map((month) => {
        const matchingMonth = aggregationPipeline.find(
          (item) => item._id.month === month
        );
        return matchingMonth ? matchingMonth.count : 0;
      });

      console.log(
        "Newly joined users per month in the current year:",
        // groupedResults,
        resultWithZeroCounts
      );
      return res.status(201).json({
        status: true,
        message: "Fetched dashboard details successfully",
        data: resultWithZeroCounts,
      });
    } catch (error) {
      console.error("Error getting dashboard details:", error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }),

  //to get yearly shop owner count for dashboard graph
  getYearlyShopOwnerCount: asyncHandler(async (req, res) => {
    try {
      const monthsOfYear = Array.from({ length: 12 }, (_, i) => i + 1); // Array representing months 1 to 12

      const aggregationPipeline = await ShopOwner.aggregate([
        {
          $match: {
            createdAt: {
              $gte: new Date(new Date().getFullYear(), 0, 1), // Start of the current year
              $lt: new Date(new Date().getFullYear() + 1, 0, 1), // Start of the next year
            },
          },
        },
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" }, // Extract the year
              month: { $month: "$createdAt" }, // Extract the month
            },
            count: { $sum: 1 }, // Count the number of users in each group
          },
        },
        {
          $sort: { "_id.year": 1, "_id.month": 1 }, // Sort the results by year and month
        },
      ]);

      const resultWithZeroCounts = monthsOfYear.map((month) => {
        const matchingMonth = aggregationPipeline.find(
          (item) => item._id.month === month
        );
        return matchingMonth ? matchingMonth.count : 0;
      });

      console.log(
        "Newly added shopOwners per month in the current year:",
        // groupedResults,
        resultWithZeroCounts
      );
      return res.status(201).json({
        status: true,
        message: "Fetched dashboard details successfully",
        data: resultWithZeroCounts,
      });
    } catch (error) {
      console.error("Error getting dashboard details:", error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }),

  //to get all getallUsersDetails details

  getallUsersDetails: asyncHandler(async (req, res) => {
    try {
      const usersList = await User.find(
        {},
        {
          name: 1,
          username: 1,
          number: 1,
          email: 1,
          createdAt: 1,
          isBlock: 1,
        }
      );
      console.log("usersList : ", usersList);
      return res.status(201).json({
        success: true,
        message: "fetch usersList successfully",
        data: usersList,
      });
    } catch (error) {
      console.error("Error gettig cat:", error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }),

  //to block or unblock user

  handleBlockUnblockUser: asyncHandler(async (req, res) => {
    try {
      const { userId } = req.body;
      let response={}
      const userDetails = await User.findOne({
        _id: userId,
      });
      console.log("userDetails :", userDetails);

      if (userDetails !== null && userDetails.isBlock) {
        const unblock = await User.updateOne(
          { _id: userId },
          { $set: { isBlock: false } }
        );
        console.log("unblock 1:", unblock);
        if (unblock.modifiedCount === 1) {
          response = { status: true, state: "unblocked" };
        }
      } else {
        const blocked = await User.updateOne(
          { _id: userId },
          { $set: { isBlock: true } }
        );
        console.log("blocked :", blocked);
        if (blocked.modifiedCount === 1) {
          response = { status: true, state: "blocked" };
        }
      }
      return res.status(201).json({
        status: "success",
        message: "block/unblock successfull",
        blockStatus: response,
      });
    } catch (error) {
      console.error("Error gettig cat:", error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }),

   //to get all getallShopOwnerDetails details

   getallShopOwnerDetails: asyncHandler(async (req, res) => {
    try {
      const usersList = await ShopOwner.find(
        {},
        {
          name: 1,
          username: 1,
          number: 1,
          email: 1,
          address:1,
          createdAt: 1,
          isBlock: 1,
        }
      );
      console.log("usersList : ", usersList);
      return res.status(201).json({
        success: true,
        message: "fetch shopOwnerList successfully",
        data: usersList,
      });
    } catch (error) {
      console.error("Error gettig cat:", error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }),

  //to block or unblock shopowner

  handleBlockUnblockShopowner: asyncHandler(async (req, res) => {
    try {
      const { userId } = req.body;
      let response={}
      const userDetails = await ShopOwner.findOne({
        _id: userId,
      });
      console.log("userDetails :", userDetails);

      if (userDetails !== null && userDetails.isBlock) {
        const unblock = await ShopOwner.updateOne(
          { _id: userId },
          { $set: { isBlock: false } }
        );
        console.log("unblock 1:", unblock);
        if (unblock.modifiedCount === 1) {
          response = { status: true, state: "unblocked" };
        }
      } else {
        const blocked = await ShopOwner.updateOne(
          { _id: userId },
          { $set: { isBlock: true } }
        );
        console.log("blocked :", blocked);
        if (blocked.modifiedCount === 1) {
          response = { status: true, state: "blocked" };
        }
      }
      return res.status(201).json({
        status: "success",
        message: "block/unblock successfull",
        blockStatus: response,
      });
    } catch (error) {
      console.error("Error gettig cat:", error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }),

   //to get all product details

   getallProductsDetails: asyncHandler(async (req, res) => {
    try {
      const products = await Product.aggregate([
        {
          $match:
            {
              isDeleted: false,
            },
        },
        {
          $lookup:
            {
              from: "shopowners",
              localField: "shopOwnerId",
              foreignField: "username",
              as: "shopowners",
            },
        },
        {
          $addFields:
            {
              categoryObjectId: {
                $toObjectId: "$categoryId",
              },
            },
        },
        {
          $lookup:
            {
              from: "categories",
              localField: "categoryObjectId",
              foreignField: "_id",
              as: "category",
            },
        },
        {
          $unwind:
            {
              path: "$shopowners",
            },
        },
        {
          $unwind:
            {
              path: "$category",
            },
        },
        {
          $project:
            {
              _id: 1,
              caption: 1,
              price: 1,
              description: 1,
              imgNames: 1,
              isDeleted: 1,
              createdAt: 1,
              shopOwnerName: "$shopowners.name", 
              shopOwnerUname: "$shopowners.username",
              shopOwnerNumber: "$shopowners.number",
              shopOwnerEmail: "$shopowners.email",
              categoryName: "$category.caption",
            },
        },
      ]);
      console.log("products : ", products);
      return res.status(201).json({
        success: true,
        message: "fetch products successfully",
        data: products,
      });
    } catch (error) {
      console.error("Error gettig cat:", error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }),

  //to block or unblock product

  handleBlockUnblockProduct: asyncHandler(async (req, res) => {
    try {
      const { proId } = req.body;
      let response={}
      const productDetails = await Product.findOne({
        _id: proId,
      });
      console.log("productDetails :", productDetails);

      if (productDetails !== null && productDetails.isDeleted) {
        const unblock = await Product.updateOne(
          { _id: proId },
          { $set: { isDeleted: false } }
        );
        console.log("unblock 1:", unblock);
        if (unblock.modifiedCount === 1) {
          response = { status: true, state: "unblocked" };
        }
      } else {
        const blocked = await Product.updateOne(
          { _id: proId },
          { $set: { isDeleted: true } }
        );
        console.log("blocked :", blocked);
        if (blocked.modifiedCount === 1) {
          response = { status: true, state: "blocked" };
        }
      }
      return res.status(201).json({
        status: "success",
        message: "block/unblock successfull",
        blockStatus: response,
      });
    } catch (error) {
      console.error("Error gettig cat:", error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }),

}