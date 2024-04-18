import { Schema, model } from "mongoose";

// Schema of Post
const postSchema = new Schema(
  {
    postedUser: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
    },
    description: {
      type: String,
    },
    imgNames: Array,
    postDeleted: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true }
);
const Post = model("Post", postSchema);
export default Post;
