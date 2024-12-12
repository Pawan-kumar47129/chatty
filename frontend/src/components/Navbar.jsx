import { LogOut, MessageSquare, Settings, User } from 'lucide-react';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import { logoutState } from '../store/authSlice';
import toast from 'react-hot-toast';

function Navbar() {
  const {authStatus,authUser}=useSelector((state)=>state.auth);
  const dispatch=useDispatch();
  //const navigate=useNavigate();
  const handleLogout=async()=>{
    const res=await authService.logout();
    if(res.success){
      dispatch(logoutState());
      toast.success(res.message);
      //navigate('/login');
    }
    else{
      toast.error(res.message);
    }
  }
  return (
    <div className='relative h-16'>
    <header
      className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 
    backdrop-blur-lg bg-base-100/80 "
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-lg font-bold">Chatty</h1>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={"/settings"}
              className={`
              btn btn-sm gap-2 transition-colors
              
              `}
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            { authStatus && authUser && (
              <>
                <Link to={"/profile"} className={`btn btn-sm gap-2`}>
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button className="flex gap-2 items-center" onClick={handleLogout}>
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
    </div>
  )
}

export default Navbar
