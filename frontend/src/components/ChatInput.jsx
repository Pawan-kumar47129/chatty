import { Image, Send, X } from "lucide-react";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast"
import messageService from "../services/messageService";
import { addMessage } from "../store/chatSlice";

function ChatInput() {
    const [inputMessage,setInputMessage]=useState("");
    const [imagePreview,setImagePreview]=useState(null);
    const dispatch=useDispatch();
    const fileInputRef=useRef(null);
    const {selectedUser}=useSelector((state)=>state.chat);
    const handleImageChange=(e)=>{
      const file=e.target.files[0];
      if(!file.type.startsWith("image/")){
        toast.error("Please select an image file");
        return ;
      }
      const reader=new FileReader();
      reader.onloadend=()=>{
        console.log("hello");
        setImagePreview(reader.result);
      }
      reader.readAsDataURL(file);
    };
    const removeImage=()=>{
      setImagePreview(null);
      if(fileInputRef.current) fileInputRef.current.value="";
    }
    const handleSubmit=async(e)=>{
      e.preventDefault();
      if(!inputMessage.trim() && !imagePreview) return;
      const res=await messageService.sendMessage(selectedUser._id,{text:inputMessage.trim(),
        image:imagePreview
      });
      if(res.success){
        dispatch(addMessage(res.newMessage))
      }
      else{toast.error("Failed to send message")}
      //clear form
      setInputMessage("");
      setImagePreview(null);
      if(fileInputRef.current) fileInputRef.current.value="";
    }
  return (
    
    <div className="p-2 border-t border-base-300 bg-base-100 rounded-xl">
     {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit}>
      <div className="flex gap-1 sm:gap-2">
        <input
          type="text"
          className="input input-bordered flex-1 text-sm h-10"
          placeholder="Type a message..."
          value={inputMessage}
          onChange={(e)=>setInputMessage(e.target.value)}
        />
        <input type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleImageChange}/>

        <button 
        type="button"
        className={`btn  h-10 min-h-0 ${imagePreview?"text-emerald-500":"text-zinc-400"}`} onClick={()=>fileInputRef.current?.click()}>
          <Image size={18} />
        </button>
        <button 
        type="submit"
        className="btn btn-primary h-10 min-h-0" 
        disabled={!inputMessage.trim() && !imagePreview}
        >
          <Send size={18} />
        </button>
      </div>
      </form>
    </div>
  );
}

export default ChatInput;
