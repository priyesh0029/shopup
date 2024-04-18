
import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import AppError from "../utilities/appError.js";
import { authServices } from "../middlewares/authServices.js";

export const authControllers = {
  //user Register

   registerUser : asyncHandler(async (req, res) => {
    const { name, username, number, email, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });

    if (existingUser) {
      throw new AppError("User with the same email or username already exists",401);
    }

    const hashedPassword = await authServices.encryptPassword(password)
    const newUser = await User.create({
      name,
      username,
      number,
      email,
      password: hashedPassword,
    });

    const token = await authServices.generateToken({id:newUser._id.toString(),role:"user"})
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

 loginUser : asyncHandler(async (req, res) => {
    console.log( "login user controller : ", req.body);
  const { loginCredential, password } = req.body;
  const user = await User.findOne({
    $or: [{ email: loginCredential }, { username: loginCredential }, { number: loginCredential }],
  });

  if (!user) {
    throw new AppError("Invalid login credentials",401);
  }
  const isPasswordMatch = await authServices.comparePassword(password, user.password);

  if (!isPasswordMatch) {
    throw new AppError("Invalid login credentials",401);
  }

  // Generate JWT token
  const token = await authServices.generateToken({id:user._id.toString(),role:"user"})

  res.status(200).json({
    success: true,
    data: {
      user: (({ _id, name, username, number, email }) => ({ _id, name, username, number, email }))(user),
      token,
    },
  });
})



};
