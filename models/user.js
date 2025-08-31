import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema=new mongoose.Schema({
    username:{type:String,unique:true,required:true},
    email:{type:String,unique:true,required:true},
    password:{type:String,required:true},
    mobile:{type:Number,required:true}
})

userSchema.pre('save',async function(next){
    const person=this;
    
    try{
        if(!person.isModified('password'))return next();
        const salt=await bcrypt.genSalt(10);
        const hashpassword=await bcrypt.hash(person.password,salt);
        person.password=hashpassword;
        next();
    }catch(err){
        return next();
    }
})
const userModel=mongoose.model("user",userSchema);
export default userModel;