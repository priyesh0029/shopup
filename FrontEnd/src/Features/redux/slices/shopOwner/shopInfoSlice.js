import { createSlice } from "@reduxjs/toolkit";

const loadUserFromLocalStorage = () => {
  try {
    const shopInfoString = localStorage.getItem("shopInfo");
    if (shopInfoString) {
      const shopInfo = JSON.parse(shopInfoString);
      return shopInfo;
    }
    return {
      _id:"",
      name: "",
      userName: "",
      email : ''
    };
  } catch (error) {
    console.log("Error loading user info from local storage:", error);
    return {
        _id:"",
        name: "",
        userName: "",
        email : ''
    };
  }
};

const initialState = {
  shopInfo: loadUserFromLocalStorage(),
};

const shopOwnerSlice = createSlice({
  name: "shopOwner",
  initialState,
  reducers: {
    //to set shopInfo while login
    SetShopInfo: (state, action) => {
      state.shopInfo = action.payload;
      try {
        localStorage.setItem("shopInfo", JSON.stringify(action.payload));
      } catch (error) {
        console.log("Error storing shopInfo in local storage:", error);
      }
    },
    //to clear local storage  while logout
    clearShopInfo: (state) => {
      state.shopInfo = {
        _id:"",
        name: "",
        userName: "",
        email : ''
      };
      try {
        localStorage.removeItem("shopInfo");
      } catch (error) {
        console.log("Error removing shopInfo from local storage:", error);
      }
    },
  },
});

export const {
    SetShopInfo,
    clearShopInfo,
} = shopOwnerSlice.actions;
export default shopOwnerSlice.reducer;