import { Router } from "express";
import jwtmiddleware from "../middleware/jwtauth.js";
//import { verify } from "jsonwebtoken";
import userModel from "../models/user.js";
const router=Router();
router.get('/',jwtmiddleware,async (req,res)=>{
    try{
        const user=await userModel.findOne({username:req.user.username});
        
        res.status(200).json(user);
    }catch(err){
        res.status(400).json({error:"not verified"});
    }
})
export default router;