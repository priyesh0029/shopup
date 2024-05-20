import { createSlice} from "@reduxjs/toolkit"



  const loadTokenFromLocalStorage = () => {
    try {
      const token = localStorage.getItem('shopToken');
      return token ? token : null;
    } catch (error) {
      console.log('Error loading token from local storage:', error);
      return null;
    }
  };

  const initialState = {
    token: loadTokenFromLocalStorage(),
  };

  const shopTokenSlice = createSlice({
    name: 'shopToken',
    initialState,
    reducers: {
      setShopToken: (state, action) => {
        state.token = action.payload;
        try {
          localStorage.setItem('shopToken', action.payload);
        } catch (error) {
          console.log('Error storing token in local storage:', error);
        }
      },
      clearShopToken: (state) => {
        state.token = null;
        try {
          localStorage.removeItem('shopToken');
        } catch (error) {
          console.log('Error removing token from local storage:', error);
        }
      },
    },
  });
  
  export const { setShopToken, clearShopToken } = shopTokenSlice.actions;
  export default shopTokenSlice.reducer;
  