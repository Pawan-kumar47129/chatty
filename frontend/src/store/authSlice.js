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
      console.log(state);
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

// Thunks for handling side-effects
/*
// import { io } from "socket.io-client";
// const SERVER_PORT = "http://localhost:5001";
export const loginAuthState = (user) => async (dispatch, getState) => {
  dispatch(setAuthState(user));
  const { socket } = getState().auth;
  if (socket?.connected) return;
  const socketInstance = io(SERVER_PORT);
  socketInstance.connect();
  dispatch(setSocket(socketInstance));
};

export const logoutAuthState = () => async (dispatch, getState) => {
  const { socket } = getState().auth;
  if (socket?.connected) {
    socket.disconnect();
    dispatch(clearAuthState());
  }
  dispatch(clearSocket());
};
*/
