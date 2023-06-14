import apiSlice from "../api/apiSlice";

const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: "/api/v1/login",
                method: "POST",
                body: { ...credentials },
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: "/api/v1/logout",
                method: 'POST',
            })
        })
    })
})

export const { useLoginMutation, useLogoutMutation } = authApiSlice;