import { memo } from "react";
import { User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeSeletedUser, setMessages } from "../store/chatSlice";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import messageService from "../services/messageService";
import { formatMessageTime } from "../lib/utils";

function ChatContainer() {
  const { selectedUser, messages } = useSelector((state) => state.chat);
  const { auth,token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const messageEndRef = useRef(null); // Reference for scrolling
  const hideMessageBox = () => {
    //for small device
    dispatch(removeSeletedUser());
  };

  useEffect(() => {
    (async () => {
      if (selectedUser) {
        setLoading(true);
        const res = await messageService.getMessages(selectedUser._id,token);
        if (res.success) dispatch(setMessages(res.messages));
        setLoading(false);
      }
    })();
  }, [selectedUser,token,dispatch]);

  useEffect(() => {
    // Scroll to the last message when messages update
    let isMounted = true;
    let scrollTimer;

    const scrollToEnd = () => {
      if (isMounted && messageEndRef.current) {
        // Use requestAnimationFrame to ensure smooth scrolling
        window.requestAnimationFrame(() => {
          messageEndRef.current.scrollIntoView({ behavior: "smooth" });
        });
      }
    };

    // Debounce to prevent overlapping scroll calls
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(scrollToEnd, 50); // Slight delay for rendering completion

    return () => {
      isMounted = false;
      clearTimeout(scrollTimer); // Cleanup timer
    };
  }, [messages, selectedUser]);
  return (
    <div
      className={`${
        selectedUser ? "block sm:block" : "hidden sm:block"
      } w-full h-[85vh] sm:h-[90vh]`}
    >
      <button
        className="flex sm:hidden hover:bg-base-4-300 font-medium text-primary underline mb-1 border rounded-lg px-2 py-1 "
        onClick={hideMessageBox}
      >
        <User className="size-6" />
        Contacts
      </button>
      <div className="w-full h-full flex flex-col bg-base-100/50   rounded-xl overflow-y-auto">
        <div className="sticky mx-4 top-2 rounded-xl mb-4 z-50">
          {/* Chat Header */}
          <ChatHeader />
        </div>
        {/* Message  Container */}
        {loading ? (
          <MessageSkeleton />
        ) : (
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message._id}
                className={`chat ${
                  message.senderId === auth?._id ? "chat-end" : "chat-start"
                }`}
              >
                <div className="chat-image avatar">
                  <div className="size-10 rounded-full border">
                    <img
                      src={
                        message.senderId === auth?._id
                          ? auth?.profilePic || "/avatar.png"
                          : selectedUser.profilePic || "/avatar.png"
                      }
                      alt="profile pic"
                    />
                  </div>
                </div>
                <div className="chat-header mb-1">
                  <time className="text-xs opacity-50 ml-1">
                    {formatMessageTime(message.createdAt)}
                  </time>
                </div>
                <div className="chat-bubble flex flex-col">
                  {message.image && (
                    <img
                      src={message.image}
                      alt="Attachment"
                      className="sm:max-w-[200px] rounded-md mb-2"
                    />
                  )}
                  {message.text && <p>{message.text}</p>}
                </div>
              </div>
            ))}
            {/* Add a dedicated element for scrolling */}
            <div ref={messageEndRef} />
          </div>
        )}

        <div className="sticky mx-4 bottom-4 sm:bottom-2 rounded-xl mb-4 z-50">
          <ChatInput />
        </div>
      </div>
    </div>
  );
}

export default memo(ChatContainer);
