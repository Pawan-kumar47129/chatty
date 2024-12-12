import React from "react";
import { useSelector } from "react-redux";
import { ChatContainer, NoChatSelected, Sidebar } from "../components";

function HomePage() {
  const { selectedUser } = useSelector((state) => state.chat);
  return (
    <div className="bg-base-300 h-full flex justify-center items-center box-border">
      <div className="flex h-full rounded-lg w-full justify-center items-center">
        <Sidebar />
        {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
      </div>
    </div>
  );
}

export default HomePage;
