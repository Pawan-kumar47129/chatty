import React from "react";
import { useSelector } from "react-redux";
import NoChatSelected from "./NoChatSelected";
import ChatContainer from "./ChatContainer";

function HomeComponent() {
  const { selectedUser } = useSelector((state) => state.chat);
  return (
    <div className=" bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(1000vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeComponent;
