import React, { useEffect, useState } from 'react';
import BASE_URL from '../URL/url';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../features/authSlice';
import { Outlet, useNavigate } from 'react-router-dom';
import useRefresh from '../hooks/useRefresh';

const PersistLogin = () => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const refresh = useRefresh();

    useEffect(() => {
        const reauth = async () => {
            try {
                await refresh();
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }

        if (token == null)
            reauth();
        else
            setIsLoading(false);
    }, [])

    return (
        isLoading ? <h3>Loading ...</h3> : <Outlet />
    );
}

export default PersistLogin;
