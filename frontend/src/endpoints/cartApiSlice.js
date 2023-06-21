import apiSlice from "../api/apiSlice";

const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        cart: builder.mutation({
            query: orderInfo => ({
                url: '/api/v1/cart',
                method: 'POST',
                body: { orderInfo }
            })
        }),
        removeCart: builder.mutation({
            query: item_id => ({
                url: `/api/v1/cart/${item_id}`,
                method: 'DELETE',
            })
        }),
        getCart: builder.query({
            query: () => ({
                url: "/api/v1/cart",
                method: "GET"
            })
        })
    })
})

export const { useCartMutation, useRemoveCartMutation, useGetCartQuery } = orderApiSlice;