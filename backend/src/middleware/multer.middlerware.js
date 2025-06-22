import multer from "multer";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/upload");
  },
  filename: function (req, file, cb) {
    const filename = Date.now()+file.originalname;
    cb(null, filename);
  },
});
const upload = multer(
    {
    storage: storage,
    limits:{ fileSize: 10 * 1024*1024 },
 });
export default upload;