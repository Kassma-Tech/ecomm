import React, { useEffect } from 'react';
import { useSelector } from 'react-redux'
import jwtDecode from 'jwt-decode'
import { Navigate, useLocation, Outlet } from 'react-router-dom';

const RequireAuth = () => {

    const location = useLocation();
    const token = useSelector(state => state.auth.token)
    console.log(token)
    let isExpired = true;
    let exp


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
