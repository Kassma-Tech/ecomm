import apiSlice from "../api/apiSlice";

const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCurrentUser: builder.query({
            query: () => ({
                url: `/api/v1/user/current-user`,
                method: "GET"
            })
        }),
        updateUser: builder.mutation({
            query: (data) => ({
                url: `/api/v1/user/`,
                method: "PATCH",
                body: data
            })
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/api/v1/user/${id}`,
                method: "DELETE"
            })
        })
    })
})

export const { useDeleteUserMutation, useGetCurrentUserQuery, useUpdateUserMutation } = userApiSlice;