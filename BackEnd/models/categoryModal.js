import { Schema, model } from "mongoose";

// Schema of Category
const categorySchema = new Schema(
  {
    caption: {
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
const Category = model("Category", categorySchema);
export default Category;
