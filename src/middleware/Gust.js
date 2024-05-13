import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getAuthUser } from '../helper/Storage';


export const GuestWithoutLogin = ()=>{
    const auth = getAuthUser();
    return (
        <>
        {
        (auth) ?  <>  <Outlet />  </>  : <Navigate to={"/login"} />  
        }
        </>
    )
}

const Guset= () => {
    const auth = getAuthUser();
  return (
    <>
    {
        (!auth) ?  <>  <Outlet />  </>  : <Navigate to={"/home"} />  
    }
    
    </>
  );
}

export default Guset;