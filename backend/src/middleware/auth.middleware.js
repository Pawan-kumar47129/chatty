import jwt from "jsonwebtoken";
import User from "../models/user.models.js";

export const protectRoute = async (req, res, next) => {
    try {
        let token = req.cookies["chat-token"]
            || (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")
                ? req.headers.authorization.split(" ")[1]
                : null);
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: No Token Provided"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: Invalid Token"
            });
        }

        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        console.log("Error in protectRoute: ", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}