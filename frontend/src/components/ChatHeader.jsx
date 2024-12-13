import React from "react";
import { useSelector } from "react-redux";

function ChatHeader() {
  const {selectedUser} =useSelector((state)=>state.chat);
  const {onlineUsers} =useSelector((state)=>state.auth);
  return (
    <div className="px-4 py-3 border-b border-base-300 bg-base-100 rounded-xl">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content font-medium">
          <img src={selectedUser.profilePic||"/avatar.png"}/>
        </div>
        <div>
          <h3 className="font-medium text-sm">{selectedUser?.fullName}</h3>
          <p className="text-xs text-base-content/70">{onlineUsers.includes(selectedUser?._id)?"Online":"Offline"}</p>
        </div>
      </div>
    </div>
  );
}

export default ChatHeader;
