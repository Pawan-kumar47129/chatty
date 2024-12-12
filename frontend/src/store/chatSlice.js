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
        setAllUsers:(state,action)=>{
            state.users=action.payload;
        },

        setMessages:(state,action)=>{
            state.messages=action.payload;
        },

        setSelectedUser:(state,action)=>{
            state.selectedUser=action.payload;
        },
        removeSeletedUser:(state,action)=>{
            state.selectedUser=null;
        }

    }
})

export const {setAllUsers,getMessages,setSelectedUser,removeSeletedUser}=chatSlice.actions;
export default chatSlice.reducer;