
import { useSelector } from "react-redux";

function ChatHeader() {
  const {selectedUser,onlineUsers} =useSelector((state)=>state.chat);
  const online=onlineUsers.includes(selectedUser?._id);
  return (
    <div className="px-4 py-3 border-b border-base-300 bg-base-100 rounded-xl">
      <div className="flex items-center gap-3">
        <div className="relative w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content font-medium">
          <img src={selectedUser.profilePic||"/avatar.png"} className="h-full w-full rounded-full"/>
          {online && (
                  <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900"></span>
                )}
        </div>
        <div>
          <h3 className="font-medium text-sm">{selectedUser?.fullName}</h3>
          <p className="text-xs text-base-content/70">{online?"Online":"Offline"}</p>
        </div>
      </div>
    </div>
  );
}

export default ChatHeader;
