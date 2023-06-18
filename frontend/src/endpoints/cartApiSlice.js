import apiSlice from "../api/apiSlice";

const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        cart: builder.mutation({
            query: orderInfo => ({
                url: '/api/v1/cart',
                method: 'POST',
                body: { orderInfo }
            })
        })
    })
})

export const { useCartMutation } = orderApiSlice;