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
        }),
        updateShippingStatus: builder.mutation({
            query: ({ orderId, shippingStatus, productId }) => ({
                url: `/api/v1/order/${orderId}`,
                method: 'PATCH',
                body: { shippingStatus, productId }
            })
        })
    })
})

export const {
    usePlaceOrderMutation,
    useGetSingleOrderQuery,
    useGetAllOrderQuery,
    useUpdateShippingStatusMutation,
} = orderApiSlice;