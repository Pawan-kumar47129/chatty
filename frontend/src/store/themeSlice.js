import { createSlice } from "@reduxjs/toolkit";

let initialState={
    themeMode: localStorage.getItem('chat-theme')||"dark"
}

const themeSlice=createSlice({
    name:"theme",
    initialState,
    reducers:{
        setTheme:(state,action)=>{
            state.themeMode=action.payload;
            localStorage.setItem('chat-theme',state.themeMode);
        }
    }
})

export const {setTheme} =themeSlice.actions;
export default themeSlice.reducer;