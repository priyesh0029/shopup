import { createSlice } from "@reduxjs/toolkit";

const createPostSlice = createSlice({
  name: "createPost",
  initialState: {
    media: [],
    caption: "",
    price: "",
    desc: "",
    newPost: {},
  },
  reducers: {
    setMedia: (state, action) => {
      state.media = action.payload;
    },
    setCaption: (state, action) => {
      state.caption = action.payload;
    },
    setPrice: (state, action) => {
      state.price = action.payload;
    },
    setDesc: (state, action) => {
      state.desc = action.payload;
    },
    clearMedia: (state) => {
      state.media = [];
    },
    clearCaption: (state) => {
      state.caption = "";
    },
    clearPrice: (state) => {
      state.caption = "";
    },
    clearDesc: (state) => {
      state.desc = "";
    },
    setNewPost: (state, action) => {
      state.newPost = action.payload;
    },
    clearNewPost: (state) => {
      state.newPost = {};
    },
  },
});

export const {
  setMedia,
  setCaption,
  setPrice,
  setDesc,
  clearMedia,
  clearPrice,
  clearCaption,
  clearDesc,
  setNewPost,
  clearNewPost,
} = createPostSlice.actions;

export default createPostSlice.reducer;
