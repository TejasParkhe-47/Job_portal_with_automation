import express from "express"
import { config } from "dotenv";
import cors from "cors"
import cookieParser from "cookie-parser";
import { connection } from "./Database/connection.js";
import { connect } from "mongoose";
import { errorMiddleware } from "./Middleware/error.js";
import fileUpload from "express-fileupload";
import userRouter from "./router/userRouter.js"
import jobRouter from "./router/jobRouter.js"
import  applicationRouter  from "./router/applicationRouter.js";
import { newsLetterCron } from "./automation/newsLetterCron.js";


const app=express()

config({ path: "./config/config.env" });

app.use(
    cors({
      origin: [process.env.FRONTEND_URL],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
 
  app.use(
    fileUpload({
      useTempFiles: true,
      tempFileDir: "/tmp/",
    })
  );
  
  app.use("/api/v1/user", userRouter);
   app.use("/api/v1/job", jobRouter);
   app.use("/api/v1/application", applicationRouter);

   
  
   newsLetterCron()
  connection();
  app.use(errorMiddleware);
  
  export default app;

  // taskkill /PID  17636 /F
