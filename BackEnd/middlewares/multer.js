import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const options = {
  cloudinary: cloudinary,
  params: {
    folder: "Relemz_posts",
    allowed_formats: ["jpg", "jpeg", "png", "svg", "webp"],
    public_id: (req, file) => {
      console.log(file, "fileisssss");
      const originalname = file.originalname.split(".");
      return `image-${Date.now()}-${originalname[0]}`;
    },
  },
};

const store = new CloudinaryStorage(options);

const uploadsMulter = multer({ storage: store }).array("image", 5);

export { uploadsMulter };
