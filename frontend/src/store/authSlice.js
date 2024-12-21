import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  authUser: null,
  authStatus: false,
  socketConnected: false,
  onlineUsers: [],
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState: (state, action) => {
      state.authUser = action.payload;
      state.authStatus = true;
    },
    setOnlineUsers:(state,action)=>{
      state.onlineUsers=action.payload;
    }
    ,
    clearAuthState: (state, action) => {
      state.authStatus = false;
      state.authUser = null;
    },
    setSocketConnected: (state, action) => {
      state.socketConnected = action.payload;
    },
  },
});

export const { setAuthState, clearAuthState, setSocketConnected,setOnlineUsers } =
  authSlice.actions;

export default authSlice.reducer;

