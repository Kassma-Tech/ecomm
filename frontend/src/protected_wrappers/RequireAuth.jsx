import React, { useEffect } from 'react';
import { useSelector } from 'react-redux'
import { Navigate, useLocation, Outlet } from 'react-router-dom';

const RequireAuth = () => {
    const token = useSelector(state => state.auth.token)
    // if (token) {
    //     let decode = jwtDecode(token);
    //     exp = decode.exp

    //     if (Date.now() < exp * 1000)
    //         isExpired = false
    //     else
    //         isExpired = true
    // }


    return (
        !token ? <Navigate to="/login" /> : <Outlet />
    );
}

export default RequireAuth;
