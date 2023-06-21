import apiSlice from "../api/apiSlice";

const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        placeOrder: builder.mutation({
            query: orderInfo => ({
                url: '/api/v1/test',
                method: 'POST',
                body: { orderInfo }
            })
        })
    })
})

export const { usePlaceOrderMutation } = orderApiSlice;