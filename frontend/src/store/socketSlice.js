import { createSlice } from "@reduxjs/toolkit";

let initialState={
    connected:false,
    connectionError:null
}
const socketSlice=createSlice({
    name:"socket",
    initialState,
    reducers:{
        setConnected:(state)=>{
            state.connected=true;
            state.connectionError=null;
        },
        setDisconnected:(state)=>{
            state.connected=false;
        },
        setConnectionError:(state,action)=>{
            state.connected=false;
            state.connectionError=action.payload;
        }
    }
});

export const {setConnected,setDisconnected,setConnectionError}=socketSlice.actions;

export default  socketSlice.reducer;