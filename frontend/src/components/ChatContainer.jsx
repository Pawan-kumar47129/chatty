import {MessageSquare, User } from 'lucide-react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeSeletedUser } from '../store/chatSlice';

function ChatContainer() {
  const {selectedUser}=useSelector((state)=>state.chat);
  const dispatch=useDispatch();
  const hideMessageBox=()=>{
    dispatch(removeSeletedUser());
  }
  return (
    <div className={`${selectedUser?"block sm:block":"hidden sm:block" } w-full  h-[82vh]`}>
      <button className='flex sm:hidden hover:bg-base-4-300 font-medium text-primary underline mb-1 border rounded-lg px-2 py-1 bg-blue-500' onClick={hideMessageBox}><User className='size-6'/>Contacts</button>
    <div className=" w-full h-full flex  flex-col items-center justify-center  bg-base-100/50   rounded-xl overflow-y-auto">
      <div className="w-full text-center space-y-6 ">
        {/* Icon Display */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div
              className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center
             justify-center animate-bounce"
            >
              <MessageSquare className="w-8 h-8 text-primary " />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-2xl font-bold">hello {selectedUser?.fullName}</h2>
        <p className="text-base-content/60">
          Select a conversation from the sidebar to start chatting
        </p>
      </div>
    </div>
    </div>
  )
}

export default ChatContainer
