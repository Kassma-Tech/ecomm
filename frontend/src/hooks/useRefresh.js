import { useDispatch } from 'react-redux';
import BASE_URL from '../URL/url';
import { setCredentials } from '../features/authSlice';

const useRefresh = () => {
    const dispatch = useDispatch();
    const refresh = async () => {
        const result = await BASE_URL.get("/api/v1/refresh-token", {
            withCredentials: true
        })
        dispatch(setCredentials({ token: result?.data?.accessToken }))
    }
    return refresh
}

export default useRefresh;
