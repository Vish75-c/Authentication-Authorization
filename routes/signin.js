import { Router } from "express";
import passport from "../middleware/auth.js";
import { createtoken } from "../middleware/jwtauth.js";
import userModel from "../models/user.js";
passport.initialize();
const router=Router();
const authmiddleware=passport.authenticate('local',({session:false}));
router.get('/',(req,res)=>{
    console.log("visited");
    res.status(200).render('signin');
})
router.post('/',authmiddleware,async (req,res)=>{
    
    try{
        const user=await userModel.findOne({username:req.body.username});
        console.log(user);
        const token=createtoken({id:user._id,username:user.username})
        
        res.cookie("token",token);
        
        res.status(200).render('profile');
    }catch(err){
        res.status(402).json({error:'Unauthorised'});
    }
})
export default router;