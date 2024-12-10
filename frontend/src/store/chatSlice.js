import {createSlice} from "@reduxjs/toolkit"

const initialState={
    messages:[],
    users:[],
    selectedUser:null,
}
const chatSlice=createSlice({
    name:"chat",
    initialState,
    reducers:{

    }
})

export const {}=chatSlice.actions;
export default chatSlice.reducer;