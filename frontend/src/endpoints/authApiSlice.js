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
        }),

        register: builder.mutation({
            query: userInfo => ({
                url: "/api/v1/register",
                method: 'POST',
                body: { ...userInfo }
            })
        }),
        changePassword: builder.mutation({
            query: (password) => ({
                url: "/api/v1/change-password",
                method: 'PATCH',
                body: password
            })
        })
    })
})

export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useChangePasswordMutation } = authApiSlice;