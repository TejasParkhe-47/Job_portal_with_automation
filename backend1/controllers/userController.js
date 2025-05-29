import {catchAsyncErrors} from "../Middleware/catchAsyncErrors.js"
import ErrorHandler from "../Middleware/error.js";
import User from "../models/userSchema.js"
import { v2 as cloudinary } from "cloudinary";
import { sendToken } from "../utils/jwtToken.js";
import jwt from "jsonwebtoken";
import { raw } from "express";


export const register=catchAsyncErrors(async(req,res,next)=>{
    try{
        const {
            name,
            email,
            phone,
            address,
            password,
            role,
            firstNiche,
            secondNiche,
            thirdNiche,
            coverLetter,
          } = req.body;
      
          if (!name || !email || !phone || !address || !password || !role) {
            return next(new ErrorHandler("All fileds are required.", 400));
          }
          if (role === "Job Seeker" && (!firstNiche || !secondNiche || !thirdNiche)) {
            return next(
              new ErrorHandler("Please provide your preferred job niches.", 400)
            );
          }
          const existingUser = await User.findOne({ email });
          if (existingUser) {
            return next(new ErrorHandler("Email is already registered.", 400));
          }
          const userData = {
            name,
            email,
            phone,
            address,
            password,
            role,
            niches: {
              firstNiche,
              secondNiche,
              thirdNiche,
            },
            coverLetter,
          };
      
          if (req.files && req.files.resume) {
              const { resume } = req.files;
              console.log(resume)
              if (resume) {
                try {
                  const cloudinaryResponse = await cloudinary.uploader.upload(
                    resume.tempFilePath,
                    
                    {resource_type: "raw", folder: "Job_Seekers_Resume" }
                    
                  );
                  if (!cloudinaryResponse || cloudinaryResponse.error) {
                    return next(
                      new ErrorHandler("Failed to upload resume to cloud.", 500)
                    );
                  }
                  userData.resume = {
                    public_id: cloudinaryResponse.public_id,
                    url: cloudinaryResponse.secure_url,
                  };
                } catch (error) {
                  return next(new ErrorHandler("Failed to upload resume", 500));
                }
              }
            }
            const user = await User.create(userData);
            sendToken(user, 201, res, "User Registered.");
            

            
    } catch(error){
        next(error)
    }
   
})

export const login=catchAsyncErrors(async(req,res,next)=>{
  const {role,email,password}=req.body
  if(!role || !email || !password) {
    return next(
      new ErrorHandler("Email, password and role are required.", 400)
)
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password.", 400));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password.", 400));
  }

  if (user.role !== role) {
    return next(new ErrorHandler("Invalid user role.", 400));
  }


  let payload = {
    email : user.email,
    id : user._id,
    role : user.role,
};

  let token = jwt.sign(payload,process.env.JWT_SECRET_KEY,{
    expiresIn : "2h",
});

// user = user.toObject();
user.token = token;
console.log(token)
user.password = undefined;

const options = {
    expires : new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    httpOnly : true,
}

res.cookie("token",token,options).status(200).json({
    success : true,
    token,
    user,
    message:"User logged in successfully"
});

  
  // sendToken(user, 200, res, "User logged in successfully.");
})

export const logout = catchAsyncErrors(async (req, res, next) => {

  res.status(200).cookie("token", "", {
      expires: new Date(0),
      httpOnly: true,
    }).json({
      success: true,
      message: "Logged out successfully.",
    });
    
});





export const getUser = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});


export const updateProfile = catchAsyncErrors(async (req, res, next) => {
  try {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      coverLetter: req.body.coverLetter,
      niches: {
        firstNiche: req.body.firstNiche,
        secondNiche: req.body.secondNiche,
        thirdNiche: req.body.thirdNiche,
      },
    };

    const { firstNiche, secondNiche, thirdNiche } = newUserData.niches;

    if (
      req.user.role === "Job Seeker" &&
      (!firstNiche || !secondNiche || !thirdNiche)
    ) {
      return next(
        new ErrorHandler("Please provide all your preferred job niches.", 400)
      );
    }

    // Handle Resume Upload
    if (req.files?.resume) {
      const resume = req.files.resume;

      // Check if user already has a resume
      const currentResumeId = req.user.resume?.public_id;

      if (currentResumeId) {
        await cloudinary.uploader.destroy(currentResumeId);
      }

      const newResume = await cloudinary.uploader.upload(resume.tempFilePath, {
        folder: "Job_Seekers_Resume",
        resource_type: "raw", // Ensure it's treated as a file, not an image

      });

      newUserData.resume = {
        public_id: newResume.public_id,
        url: newResume.secure_url,
      };
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      user,
      message: "Profile updated successfully.",
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return next(new ErrorHandler("Something went wrong.", 500));
  }
});

export const updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password is incorrect.", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(
      new ErrorHandler("New password & confirm password do not match.", 400)
    );
  }

  user.password = req.body.newPassword;
  await user.save();
  sendToken(user, 200, res, "Password updated successfully.");
});



