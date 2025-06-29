import User from "../models/user.models.js";

import Message from "../models/message.models.js";

import uploadOnCloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const fillteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password"); //exclude the password field
    res.status(200).json({
      success: true,
      message: "get all userSuccessfully",
      users: fillteredUsers,
    });
  } catch (error) {
    console.log("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;
    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });
    res.status(200).json({
      success: true,
      messages: messages,
    });
  } catch (error) {
    console.log("Error in get Messages Controller: ", error.message);
    res.status(500).json({
      success:false,
      message: "Internal Server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const {text} = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    let imageUrl="";
    if (req.file) {
      const uploadResponse = await uploadOnCloudinary(req.file.path);
      imageUrl = uploadResponse.imageUrl;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();
    //todo:realTime functionality goes here =>socket.io;
    const receiveSocketId=getReceiverSocketId(receiverId);
    if(receiveSocketId) io.to(receiveSocketId).emit('newMessage',newMessage);
    res.status(201).json({
      success: true,
      message: "successfully sended!",
      newMessage: newMessage,
    });
  } catch (error) {
    console.log("Error in sendMessage controller", error.message);
    res.status(500).json({ success: false, message: "Internal Server error" });
  }
};
