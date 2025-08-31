import express from "express";
import dotenv from "dotenv";
import db from "./db.js"
import signup from "./routes/signup.js"
import signin from "./routes/signin.js";

const app=express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded());
const port=process.env.PORT||3000;


app.use('/signin',signin);
app.use('/signup',signup);
app.get('/',(req,res)=>{
    res.send("working");
})
app.listen(port,()=>{
    console.log("Server is Running");
})