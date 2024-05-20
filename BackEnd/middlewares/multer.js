import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const shopupProductsOptions = {
  cloudinary: cloudinary,
  params: {
    folder: "ShopUp_products",
    allowed_formats: ["jpg", "jpeg", "png", "svg", "webp"],
    public_id: (req, file) => {
      console.log(file, "fileisssss");
      const originalname = file.originalname.split(".");
      return `image-${Date.now()}-${originalname[0]}`;
    },
  },
};

const shopupCategoryOptions = {
  cloudinary: cloudinary,
  params: {
    folder: 'shopup_categories',
    allowed_formats: ['jpg', 'jpeg', 'png', 'svg', 'webp'],
    public_id: (req, file) => {
      console.log(file, 'category file');
      const originalname = file.originalname.split('.');
      return `shopup_categories-${Date.now()}-${originalname[0]}`;
    }
  }
};


const shopupProducts = new CloudinaryStorage(shopupProductsOptions);
const shopupCategories = new CloudinaryStorage(shopupCategoryOptions);

const uploadShopupProducts = multer({ storage: shopupProducts }).array("image", 5);
const uploadShopupCategory = multer({ storage: shopupCategories }).single('image');


export { uploadShopupProducts,uploadShopupCategory};
