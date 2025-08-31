import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.Local_Url,{
    useUnifiedTopology:true,
    useNewUrlParser:true
})
const db=mongoose.connection;
db.on('connected',()=>{
    console.log("Database is connected");
})
db.on('disconnected',()=>{
    console.log("Database is not connected");
})
db.on('error',()=>{
    console.log("Error Connecting with database")
})
export default db;