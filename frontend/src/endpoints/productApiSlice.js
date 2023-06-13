import apiSlice from "../api/apiSlice";


const productApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getSingleProduct: builder.query({
            query: (id) => `/api/v1/product/${id}`
        }),
        getAllProducts: builder.query({
            query: () => "/api/v1/products"
        }),

    })
})

export const { useGetAllProductsQuery, useGetSingleProductQuery } = productApiSlice