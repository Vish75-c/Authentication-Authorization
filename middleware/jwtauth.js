import jwt from "jsonwebtoken";
import express from "express";
import dotenv from "dotenv";

dotenv.config();
const jwtmiddleware=(req,res,next)=>{
    //first check if the request header has authorization or not
    const authorization=req.headers.authorization;
    console.log(authorization);
    if(!authorization)return res.status(401).json({error:"Token not found"});
    const token=req.headers.authorization.split(' ')[1];
    console.log(token);
    if(!token)return next();
    try{
        const decoded=jwt.verify(token,process.env.SecretKey);
        req.user=decoded;
        console.log(decoded);
        next();
    }catch(err){
        return next();
    }
}
export const createtoken=(data)=>{
    return jwt.sign(data,process.env.SecretKey,{expiresIn:360000});
}

export  default jwtmiddleware;