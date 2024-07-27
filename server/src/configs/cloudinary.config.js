import { v2 } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import { env } from "~/configs/environtment.config";

v2.config({
     cloud_name: env.CLOUDINARY_NAME,
     api_key: env.CLOUDINARY_KEY,
     api_secret: env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
     cloudinary: v2,
     allowedFormats: ["jpg", "png", "webp"],
     filename: function (req, file, cb) {
          cb(null, file.originalname);
     },
});

const uploadCloud = multer({ storage });

export default uploadCloud;
