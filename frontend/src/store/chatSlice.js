import {createSlice} from "@reduxjs/toolkit"

const initialState={
    messages:[],
    allUsers:[],
    onlineUsers:[],
    selectedUser:null,
}
const chatSlice=createSlice({
    name:"chat",
    initialState,
    reducers:{
        setAllUsers:(state,action)=>{
            state.allUsers=action.payload;
        },
        setOnlineUsers:(state,action)=>{
            state.onlineUsers=action.payload;
        },
        setMessages:(state,action)=>{
            state.messages=action.payload;
        },
        addMessage:(state,action)=>{
            state.messages.push(action.payload);
        },
        setSelectedUser:(state,action)=>{
            state.selectedUser=action.payload;
        },
        removeSeletedUser:(state)=>{
            state.selectedUser=null;
        },

    }
})

export const {setAllUsers,setMessages,setSelectedUser,removeSeletedUser,addMessage,setOnlineUsers}=chatSlice.actions;
export default chatSlice.reducer;