import apiSlice from "../api/apiSlice";


const productApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getSingleProduct: builder.query({
            query: (id) => `/api/v1/product/${id}`
        }),
        getAllProducts: builder.query({
            query: () => "/api/v1/products"
        }),
        getProductsByRole: builder.query({
            query: () => "/api/v1/products/by-role"
        }),
        deleteSingleProduct: builder.mutation({
            query: (product_id) => ({
                url: `/api/v1/product/${product_id}`,
                method: 'DELETE'
            })
        }),
        updateProduct: builder.mutation({
            query: (product_id) => ({
                url: `/api/v1/product/${product_id}`,
                method: 'PATCH'
            })
        })
    })
})

export const {
    useGetAllProductsQuery,
    useGetSingleProductQuery,
    useGetProductsByRoleQuery,
    useDeleteSingleProductMutation,
    useUpdateProductMutation
} = productApiSlice