import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import AppError from "../utilities/appError.js";
import { authServices } from "../middlewares/authServices.js";
import ShopOwner from "../models/shopOwner.js";
import admin from "../models/admin.js";

export const authControllers = {
  //shop Register
  shopRegister: asyncHandler(async (req, res) => {
    console.log("req body of shopregister : ", req.body);
    const { name, username, number, email, role, location, address, password } =
      req.body;
    const existingUser = await ShopOwner.findOne({
      $or: [{ email }, { username }, { number }],
    });

    if (existingUser) {
      throw new AppError(
        "User with the same email,phonenumber or username already exists",
        401
      );
    }

    const hashedPassword = await authServices.encryptPassword(password);
    const newUser = await ShopOwner.create({
      name,
      username,
      number,
      email,
      role,
      address,
      location,
      password: hashedPassword,
    });
    console.log("new user details after create : ", newUser);
    const token = await authServices.generateToken({
      id: newUser._id.toString(),
      role: newUser.role,
    });
    res.status(201).json({
      success: true,
      data: {
        user: (({ _id, name, username, number, email }) => ({
          _id,
          name,
          username,
          number,
          email,
        }))(newUser),
        token,
      },
    });
  }),

  //user Register

  registerUser: asyncHandler(async (req, res) => {
    const { name, username, number, email, role, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });

    if (existingUser) {
      throw new AppError(
        "User with the same email or username already exists",
        401
      );
    }

    const hashedPassword = await authServices.encryptPassword(password);
    const newUser = await User.create({
      name,
      username,
      number,
      email,
      role,
      password: hashedPassword,
    });

    const token = await authServices.generateToken({
      id: newUser._id.toString(),
      role: newUser.role,
    });
    res.status(201).json({
      success: true,
      data: {
        user: (({ _id, name, username, number, email }) => ({
          _id,
          name,
          username,
          number,
          email,
        }))(newUser),
        token,
      },
    });
  }),

  //shop login
  shopLogin: asyncHandler(async (req, res) => {
    console.log("login user controller : ", req.body);
    const { loginCredential, password } = req.body;
    const user = await ShopOwner.findOne({
      $or: [
        { email: loginCredential },
        { username: loginCredential },
        { number: loginCredential },
      ],
    });

    if (!user) {
      throw new AppError("Invalid login credentials", 401);
    }
    const isPasswordMatch = await authServices.comparePassword(
      password,
      user.password
    );

    if (!isPasswordMatch) {
      throw new AppError("Invalid login credentials", 401);
    }

    // Generate JWT token
    const token = await authServices.generateToken({
      id: user._id.toString(),
      role: user.role,
    });

    res.status(200).json({
      success: true,
      data: {
        user: (({ _id, name, username, number, email }) => ({
          _id,
          name,
          username,
          number,
          email,
        }))(user),
        token,
      },
    });
  }),

  //customer login
  loginUser: asyncHandler(async (req, res) => {
    console.log("login user controller : ", req.body);
    const { loginCredential, password } = req.body;
    const user = await User.findOne({
      $or: [
        { email: loginCredential },
        { username: loginCredential },
        { number: loginCredential },
      ],
    });

    if (!user) {
      throw new AppError("Invalid login credentials", 401);
    }
    const isPasswordMatch = await authServices.comparePassword(
      password,
      user.password
    );

    if (!isPasswordMatch) {
      throw new AppError("Invalid login credentials", 401);
    }

    // Generate JWT token
    const token = await authServices.generateToken({
      id: user._id.toString(),
      role: user.role,
    });

    res.status(200).json({
      success: true,
      data: {
        user: (({ _id, name, username, number, email }) => ({
          _id,
          name,
          username,
          number,
          email,
        }))(user),
        token,
      },
    });
  }),

  //adminLogin

  adminLogin: asyncHandler(async (req, res) => {
    console.log("login admin controller : ", req.body);
    const { loginCredential, password } = req.body;
    const user = await admin.findOne({
      $or: [
        { email: loginCredential },
        { username: loginCredential },
      ],
    });

    console.log("admindetails : ",user);
    if (!user) {
      throw new AppError("Invalid login credentials", 401);
    }
    const isPasswordMatch = await authServices.comparePassword(
      password,
      user.password
    );

    if (!isPasswordMatch) {
      throw new AppError("Invalid login credentials", 401);
    }

    // Generate JWT token
    const token = await authServices.generateToken({
      id: user._id.toString(),
      role: "admin",
    });

    res.status(200).json({
      success: true,
      data: {
        user: (({ _id }) => ({
          _id
        }))(user),
        token,
      },
    });
  }),
};
