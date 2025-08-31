
import express from "express";
import { Router } from "express";
import userModel from "../models/user.js";

import { createtoken } from "../middleware/jwtauth.js";
const app=express();
const router=express.Router();
router.get('/',(req,res)=>{
    res.render('signup')
})
router.post('/',async (req,res)=>{
    try{
        const st=req.body;
        //req.cookie(token,"abc");
        const person=new userModel(st);
        const response=await person.save();
        
        const token=createtoken({id:response.id,username:st.username});
        console.log("User data saved");
        res.cookie("token",token);
        res.status(200).render('profile');

    }catch(err){
        console.log("failed");
        res.status(500).json({error:err});
    }
})
export default router;