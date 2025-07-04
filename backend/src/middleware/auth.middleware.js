import jwt from "jsonwebtoken";
import User from "../models/user.models.js";

export const protectRoute=async(req,res,next)=>{
    try {
        const token=req.cookies["chat-token"];
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Unauthrized No Token Provided"
            });
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({
                success:false,
                message:"Unauthorized-invalid Token"
            });
        }
        const user=await User.findById(decoded.userId).select("-password");
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found",
            })
        }
        req.user=user;
        req.token=token;
        next();
    } catch (error) {
        console.log("Error in protectRoute: ",error.message);
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        });
    }
}