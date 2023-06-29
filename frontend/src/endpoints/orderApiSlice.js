import apiSlice from "../api/apiSlice";

const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        placeOrder: builder.mutation({
            query: orderInfo => ({
                url: '/api/v1/order',
                method: 'POST',
                body: { orderInfo }
            })
        }),
        getSingleOrder: builder.query({
            query: () => ({
                url: `/api/v1/order/single`,
                method: 'GET',
            })
        }),
        getAllOrder: builder.query({
            query: () => ({
                url: `/api/v1/order/`,
                method: 'GET',
            })
        })
    })
})

export const {
    usePlaceOrderMutation,
    useGetSingleOrderQuery,
    useGetAllOrderQuery
} = orderApiSlice;