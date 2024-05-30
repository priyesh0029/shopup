import { createSlice } from "@reduxjs/toolkit";

const loadUserFromLocalStorage = () => {
  try {
    const userInfoString = localStorage.getItem("userInfo");
    if (userInfoString) {
      const userInfo = JSON.parse(userInfoString);
      return userInfo;
    }
    return {
      _id:"",
      name: "",
      userName: "",
      email : '',
      cart :''
    };
  } catch (error) {
    console.log("Error loading user info from local storage:", error);
    return {
        _id:"",
        name: "",
        userName: "",
        email : '',
        cart :''
    };
  }
};

const initialState = {
  userInfo: loadUserFromLocalStorage(),
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    //to set userInfo while login
    SetUserInfo: (state, action) => {
      state.userInfo = action.payload;
      try {
        localStorage.setItem("userInfo", JSON.stringify(action.payload));
      } catch (error) {
        console.log("Error storing userInfo in local storage:", error);
      }
    },
    //to clear local storage  while logout
    clearUserInfo: (state) => {
      state.userInfo = {
        _id:"",
        name: "",
        userName: "",
        email : '',
        cart :''
      };
      try {
        localStorage.removeItem("userInfo");
      } catch (error) {
        console.log("Error removing userInfo from local storage:", error);
      }
    },
    //to add cart count 
    CartCountManage : (state, action) => {
      state.userInfo.cart = action.payload;
      try {
        localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
      } catch (error) {
        console.log("Error storing userInfo in local storage:", error);
      }
    },
  },
});

export const {
  SetUserInfo,
  clearUserInfo,
  CartCountManage
} = homeSlice.actions;
export default homeSlice.reducer;
