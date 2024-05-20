import { Schema, model } from "mongoose";

// Schema of Post
const ProductSchema = new Schema(
  {
    shopOwnerId: {
      type: String,
      required: true,
    },
    categoryId: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
    },
    price: {
      type: Number,
    },
    description: {
      type: String,
    },
    imgNames: Array,
    isDeleted: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true }
);
const Product = model("Product", ProductSchema);
export default Product;
