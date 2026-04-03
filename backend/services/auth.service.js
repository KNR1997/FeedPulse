import User from "../models/User.js";
import jwt from "jsonwebtoken";

// generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// Service to register a new user
export const registerUserService = async ({ name, email, password }) => {
  if (!name || !email || !password) {
    throw new Error("All fields required");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error("User already exists");
  }

  const user = await User.create({ name, email, password });

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  };
};

// Service to login a user
export const loginUserService = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (user && (await user.comparePassword(password))) {
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    };
  } else {
    throw new Error("Invalid email or password");
  }
};
