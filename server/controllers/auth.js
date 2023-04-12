import bcrycpt from "bcrypt";
import  jwt  from "jsonwebtoken";
import User from "../models/user.js";

export const register= async (req,res)=>{
    
    try{
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        }=req.body;
        const salt =  await bcrycpt.genSalt();
        const passwordHash=await bcrycpt.hash(password,salt);
        const newUser= new User({
            firstName,
            lastName,
            email,
            password:passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile:Math.floor(Math.random()*100),
            impressions:Math.floor(Math.random()*100)
        });
        const savedUser= await newUser.save();
        res.status(201).json(savedUser);
    }catch(err){
        res.status(500).json({error:err.message});
    }

}
export const login= async (req,res)=>{

   try{
    const {email,password}=req.body;
    console.log(req.body);
    const user=await User.findOne({email:email});
    if(!user){
        res.status(400).json({msg:"User does not exist. "});
    }else{
        
        const isMatch=await bcrycpt.compare(password,user.password);
        if(isMatch){
            
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
            delete user.password;
            res.status(200).json({token,user});
        }else{
            res.status(400).json({message:"invalid credentials"})
        }
    }
   }catch(err){{
    res.status(500).json({error:err.message,message:"something went wrong"});
   }}
}
