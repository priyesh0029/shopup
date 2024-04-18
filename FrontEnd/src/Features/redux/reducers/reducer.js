import {combineReducers } from "redux"
import tokenSlice from "../slices/user/tokenSlice.js"
import homeSlice from "../slices/user/homeSlice.js"


const rootReducer = combineReducers ({
    token : tokenSlice,
    home : homeSlice,
})

export default rootReducer