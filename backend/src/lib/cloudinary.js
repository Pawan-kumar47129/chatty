import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { config } from "dotenv";
config({ path: "./src/.env" });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (filePath, publicId=null) => {
  if (!filePath) return { success: false, message: "Image not provided!" };
  // public id required for update the picture
  try {
    const option = {
      resource_type: "image",
      public_id: publicId,
      overwrite: true,
    };
    // first time we upload then we required in which folder we want to upload
    if (!publicId) {
      option.folder = "chatApp";
    }
    //when public_id we provide then they update the old image  with new image and then send
    const res = await cloudinary.uploader.upload(filePath, option);
    return {
      success: true,
      message: "Image uploaded successfull",
      imageUrl: res.secure_url,
      publicId: res.public_id,
    };
  } catch (error) {
    console.log(error.message);
    return {
      success: false,
      message: "Image not upload some error  occure",
    };
  } finally {
    // delete file from loacl server
    fs.unlinkSync(filePath);
  }
};
export default uploadOnCloudinary;
