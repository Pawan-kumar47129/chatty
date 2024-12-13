import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { getMessages, getUsersForSidebar, sendMessage } from '../controllers/message.controller.js';
import upload from '../middleware/multer.middlerware.js';

const router=express.Router({mergeParams:true});

router.get("/users",protectRoute,getUsersForSidebar);

router.get("/:id",protectRoute,getMessages);

router.post("/send/:id",protectRoute,upload.single('image'),sendMessage);

export default router;