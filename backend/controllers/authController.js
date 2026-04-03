import {
  loginUserService,
  registerUserService,
} from "../services/auth.service.js";
import { errorResponse, successResponse } from "../utils/apiResponse.js";

// @desc    Register new User
// @route   POST /api/auth/register
export const registerUser = async (req, res) => {
  try {
    const result = await registerUserService(req.body);
    return successResponse(res, result, "User Register successful", 201);
  } catch (err) {
    return errorResponse(res, err.message, 400);
  }
};

// @desc    Login User
// @route   POST /api/auth/login
export const loginUser = async (req, res) => {
  try {
    const result = await loginUserService(req.body);
    return successResponse(res, result, "Login successful", 200);
  } catch (err) {
    return errorResponse(res, err.message, 400);
  }
};
