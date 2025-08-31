import { Router } from "express";
import passport from "../middleware/auth.js";

passport.initialize();
const router=Router();
const authmiddleware=passport.authenticate('local',({session:false}));
router.post('/',authmiddleware,async (req,res)=>{
    try{
        res.status(200).send("1")
    }catch(err){
        res.status(402).send("-1");
    }
})
export default router;