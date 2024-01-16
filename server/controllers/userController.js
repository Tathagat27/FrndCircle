import express from "express";
import { User } from "../models/userModel.js";
import expressAsyncHandler from "express-async-handler";
import { generateToken } from "../config/generateToken.js";

export const loginController = async (req, res) => {
  const { name, password } = req.body;

  // Check for all fields
  if (!name || !password) {
    res.sendStatus(400);
    // throw new Error("All necessary input fields have not been filled");
  }

  const user = await User.findOne({ name });
  // console.log(user);

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.sendStatus(401);
    // throw new Error("Invalid Username or Password");
  }
};

export const signupController = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Check for all fields
  if (!name || !email || !password) {
    res.sendStatus(400);
    // throw new Error("All necessary input fields have not been filled");
  }

  // pre-existing email

  const emailExist = await User.findOne({ email });
  if (emailExist) {
    res.sendStatus(405);
    // throw new Error("Email already exists");
  }

  // pre-existing userName

  const userExist = await User.findOne({ name });
  if (userExist) {
    res.sendStatus(406);
    // throw new Error("Username already exists");
  }

  // Create an entry  in the db
  const user = await User.create({ name, email, password });

  // console.log(user);

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    // throw new Error("Registration Error");
  }
});

export const fetchAllUsersController = expressAsyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

    const users = await User.find(keyword).find({
        _id: { $ne: req.user._id},
    });
    res.send(users);
});
