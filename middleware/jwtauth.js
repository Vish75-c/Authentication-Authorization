import jwt from "jsonwebtoken";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
const jwtmiddleware=(req,res,next)=>{
    const token=req.header.authorization.split(' ')[1];
    if(!token)return req.status(401).json({error:"Unauthorized"});
    try{
        const decoded=jwt.verify(token,process.env.SecretKey);
        req.user=decoded;
        next();
    }catch(err){
        return next();
    }
}
const createtoken=(data)=>{
    return jwt.sign(data,process.env.SecretKey,{expiresIn:360000});
}

export default {createtoken,jwtmiddleware};