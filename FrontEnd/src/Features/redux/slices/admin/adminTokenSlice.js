import { createSlice} from "@reduxjs/toolkit"



  const loadTokenFromLocalStorage = () => {
    try {
      const token = localStorage.getItem('adminToken');
      return token ? token : null;
    } catch (error) {
      console.log('Error loading token from local storage:', error);
      return null;
    }
  };

  const initialState = {
    token: loadTokenFromLocalStorage(),
  };

  const adminTokenSlice = createSlice({
    name: 'adminToken',
    initialState,
    reducers: {
      setAdminToken: (state, action) => {
        state.token = action.payload;
        try {
          localStorage.setItem('adminToken', action.payload);
        } catch (error) {
          console.log('Error storing token in local storage:', error);
        }
      },
      clearAdminToken: (state) => {
        state.token = null;
        try {
          localStorage.removeItem('adminToken');
        } catch (error) {
          console.log('Error removing token from local storage:', error);
        }
      },
    },
  });
  
  export const { setAdminToken, clearAdminToken } = adminTokenSlice.actions;
  export default adminTokenSlice.reducer;
  