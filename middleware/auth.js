import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import userModel from "../models/user.js";
import createtoken from "../middleware/jwtauth.js";
import bcrypt from "bcrypt";
passport.use(new LocalStrategy(async (username,password,done)=>{
    try{
        console.log("visited");
        const user=await userModel.findOne({username:username});
        console.log(user);
        if(!user)return done(null,false,{error:"Something went wrong"});
        const ismatch=await bcrypt.compare(password,user.password);
        
        if(ismatch){
            const token=createtoken({id:user.id,username:username})
            console.log(token);
            return done(null,true);
        }else{
            return done(null,false,{error:"Something went wrong"});
        }
    }catch(err){
        return done(null,false,{error:err});
    }
}))
export default passport;