import {combineReducers } from "redux"
import homeSlice from "../slices/user/homeSlice.js"
import createPostSlice from "../slices/user/postSlice.js"
import tokenSlice from "../slices/user/tokenSlice.js"
import shopTokenSlice from "../slices/shopOwner/shopOwnerToken.js"
import adminTokenSlice from "../slices/admin/adminTokenSlice.js"
import shopInfoSlice from "../slices/shopOwner/shopInfoSlice.js"



const rootReducer = combineReducers ({
    adminToken : adminTokenSlice,
    shopToken : shopTokenSlice,
    token : tokenSlice,
    home : homeSlice,
    createPost : createPostSlice,
    shopInfo :shopInfoSlice
})

export default rootReducer