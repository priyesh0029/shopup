import {combineReducers } from "redux"
import tokenSlice from "../slices/user/tokenSlice.js"
import homeSlice from "../slices/user/homeSlice.js"
import createPostSlice from "../slices/user/postSlice.js"



const rootReducer = combineReducers ({
    token : tokenSlice,
    home : homeSlice,
    createPost : createPostSlice,
})

export default rootReducer