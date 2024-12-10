import React, { memo, useEffect,useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LoaderPage } from '../pages';
function AuthLayout({children,authentication=true}) {
    const [loading,setLoading]=useState(true);
    const navigate=useNavigate();
    const authStatus=useSelector((state)=>state.auth.authStatus);
    useEffect(()=>{
        if(authentication && authStatus!==authentication){
            navigate('/login');
        }
        // else if(!authentication && authStatus!==authentication){
        //     navigate('/');
        // }
        setLoading(false);
    },[authStatus,authentication,navigate]);
    
  return (
    loading ?<LoaderPage/>:<div>{children}</div>
  )
}

export default memo(AuthLayout);

