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
            }),
            refetchOnMountOrArgChange: true
        }),
        getAllOrder: builder.query({
            query: () => ({
                url: `/api/v1/order/`,
                method: 'GET',
            }),
            refetchOnMountOrArgChange: true
        })
    })
})

export const {
    usePlaceOrderMutation,
    useGetSingleOrderQuery,
    useGetAllOrderQuery
} = orderApiSlice;