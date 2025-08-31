import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import userModel from "../models/user.js";
import { createtoken }  from "../middleware/jwtauth.js";
import bcrypt from "bcrypt";
passport.use(new LocalStrategy(async (username,password,done)=>{
    try{
        console.log("auth")
        console.log(username);
        console.log(password);
        const user=await userModel.findOne({username:username});
        if(!user)return done(null,false,{error:"Something went wrong"});
        console.log(user);
        const ismatch=await bcrypt.compare(password,user.password);
        console.log(ismatch);
        if(ismatch){
            return done(null,user);
        }else{
            return done(null,false,{error:"Something went wrong"});
        }
    }catch(err){
        return done(null,false,{error:err});
    }
}))
export default passport;