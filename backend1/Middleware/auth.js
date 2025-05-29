import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";
import  User  from "../models/userSchema.js";

import { config } from "dotenv";

// export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
//   const { token } = req.cookies;
//   if (!token) {
//     return next(new ErrorHandler("User is not authenticated.", 400));
//   }
//   const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

//   req.user = await User.findById(decoded.id);

//   next();
// });

//import jwt from "jsonwebtoken";
//import catchAsyncErrors from "../middlewares/catchAsyncErrors.js"; // Ensure you have this middleware
import cookieParser from "cookie-parser"; // Make sure this is used in your Express app

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  try {
    // Correct way to get the token from cookies
    const token = req.cookies.token; 

    console.log("Token:", token);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing",
      });
    }

    // Verify the token
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      console.log("Decoded Token:", decoded);

      req.user = decoded; // Attach user info to request
      next(); // Move to the next middleware
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid",
      });
    }
  } catch (err) {
    console.error("Error in authentication:", err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while verifying token",
    });
  }
});


export const isAuthorized = (...roles) => {
  console.log("hello")
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `${req.user.role} not allowed to access this resource.`
        )
      );
    }
    next();  
  };
};