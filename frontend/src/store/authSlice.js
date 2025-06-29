import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  auth: null,
  token:null,
  authStatus: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState: (state, action) => {
      state.auth = action.payload.user;
      state.token=action.payload.token;
      state.authStatus = true;
    }
    ,
    clearAuthState: (state) => {
      state.authStatus = false;
      state.auth = null;
      state.token=null;
    }
  },
});

export const { setAuthState, clearAuthState } =
  authSlice.actions;

export default authSlice.reducer;

