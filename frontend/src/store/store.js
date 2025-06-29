import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice.js";
import themeReducer from "./themeSlice.js";
import chatReducer from "./chatSlice.js";
import socketReducer from "./socketSlice.js";
import socketMiddleware from "./socketmiddleware.js";
const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    chat: chatReducer,
    socket:socketReducer,
  },
  middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware().concat(socketMiddleware)
});

export default store;
