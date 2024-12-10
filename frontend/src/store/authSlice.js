
import {createSlice} from "@reduxjs/toolkit"

let initialState={
    authUser:null,
    authStatus:false,
    loading:false,
}
const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        checkAuthState:(state,action)=>{
            state.authUser=action.payload;
            state.authStatus=true;
            state.isCheckingAuth=false;
        },
        loginState:(state,action)=>{
            console.log(action.payload);
            state.authUser=action.payload;
            state.authStatus=true;
        },

        logoutState:(state,action)=>{
            console.log(state);
            state.authStatus=false;
            state.authUser=null;
            console.log(state);
        }

    }
});
export const {checkAuthState,loginState,logoutState}=authSlice.actions;

export default authSlice.reducer;