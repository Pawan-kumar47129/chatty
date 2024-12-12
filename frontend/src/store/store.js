import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice.js";
import themeReducer from "./themeSlice.js";
import chatReducer from "./chatSlice.js";
const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    chat: chatReducer,
  },
});

export default store;
