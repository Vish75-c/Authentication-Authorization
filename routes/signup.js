
import express from "express";
import { Router } from "express";
import userModel from "../models/user.js";
import createtoken from "../middleware/jwtauth.js";
const router=express.Router();

router.post('/',async (req,res)=>{
    try{
        const st=req.body;
        //req.cookie(token,"abc");
        const person=new userModel(st);
        const response=await person.save();
        const token=createtoken({id:response.id,username:st.username});
        console.log(token);
        console.log("User data saved");
        res.status(200).json(response)
    }catch(err){
        console.log("failed");
        res.status(500).json({error:err});
    }
})
export default router;