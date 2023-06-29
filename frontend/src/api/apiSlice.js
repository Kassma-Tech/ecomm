import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials } from '../features/authSlice';

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:4000",
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token;
        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithRefreshToken = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    //access token - revoke
    if (result?.error) {
        const newToken = await baseQuery('/api/v1/refresh-token', api, extraOptions);
        if (newToken?.data != undefined) {
            // granted resource /
            api.dispatch(setCredentials({ token: newToken?.data?.accessToken }));
            result = await baseQuery(args, api, extraOptions);
        }
    }
    return result
}

const apiSlice = createApi({
    reducerPath: "login",
    refetchOnMountOrArgChange: true,
    baseQuery: baseQueryWithRefreshToken,
    endpoints: builder => ({})
})

export default apiSlice