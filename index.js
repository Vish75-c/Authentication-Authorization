import express from "express";
import dotenv from "dotenv";
import db from "./db.js"
import profileRouter from "./routes/profile.js"
import signup from "./routes/signup.js"
import signin from "./routes/signin.js";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
const app=express();
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(cookieParser());
// Set EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(express.urlencoded());
const port=process.env.PORT||3000;


app.use('/signin',signin);
app.use('/signup',signup);
app.use('/profile',profileRouter);
app.get('/',(req,res)=>{
    res.status(200).json({Message:'Working'});
})
app.listen(port,()=>{
    console.log("Server is Running");
})