import apiSlice from "../api/apiSlice";

const paymentApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getClientId: builder.query({
            query: () => '/api/v1/payment'
        })
    })
})

export const { useGetClientIdQuery } = paymentApiSlice;