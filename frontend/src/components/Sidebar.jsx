import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import messageService from "../services/messageService";
import { setAllUsers, setSelectedUser } from "../store/chatSlice";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import {Users } from "lucide-react";

function Sidebar() {
  const { users, selectedUser } = useSelector((state) => state.chat);
  const { onlineUsers } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [filterUser, setFilterUser] = useState(users);
  const [search, setSearch] = useState("");
  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      const res = await messageService.getUsers({ signal: controller.signal });
      if (res.success) {
        dispatch(setAllUsers(res.users));
      }
      setLoading(false);
    })();
    return () => controller.abort();
  }, [dispatch]);


  useEffect(() => {
    let clearId = setTimeout(() => {
      setFilterUser(() => {
        if (!search) return users;
        return users.filter((user) =>
          user.fullName.toLowerCase().includes(search.toLowerCase())
        );
      });
    }, 100);
    return () => clearTimeout(clearId);
  }, [search, users]);
  if (loading) return <SidebarSkeleton />;
  return (
    <aside
      className={`h-[89vh] sm:h-[89vh] w-80 md:w-96  border-base-300 flex flex-col transition-all duration-200  box-border  ${
        selectedUser ? "hidden sm:flex" : "flex sm:flex"
      }`}
    >
      <div className="border-b border-base-300 w-full p-5 h-full box-border flex flex-col">
        <div className="flex items-center gap-2 h-[10vh]">
          <Users className="size-6" />
          <span className="font-medium block">Contacts</span>
        </div>
        {/* Search  bar*/}
        <div className="label gap-1">
          <input
            onChange={(e) => setSearch(e.target.value)}
            className="input pr-1 text-lg"
            placeholder="search friend..."
          />
        </div>
        {/* Todo online filter toggle */}
        <div className="sm:overflow-y-auto w-full py-3  sm:h-[75vh] ">
          {filterUser?.map((user) => (
            <button
              key={user._id}
              onClick={()=>{
                dispatch(setSelectedUser(user));
                setSearch('');
              }}
              className={`w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors${
                selectedUser?._id === user._id
                  ? "bg-base-300 ring-1 ring-base-300"
                  : ""
              }`}
            >
              <div className="relative">
                <img
                  src={user.profilePic || "/avatar.png"}
                  alt={user.fullName}
                  className="size-10"
                />
                {onlineUsers.includes(user._id) && (
                  <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900"></span>
                )}
              </div>
              {/* User info -only visible on larger screens */}
              <div className="text-left min-w-0">
                <div className="font-medium truncate">{user.fullName}</div>
                <div className="text-sm text-zinc-400">
                  {onlineUsers.includes(user._id) ? "online" : "offline"}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
