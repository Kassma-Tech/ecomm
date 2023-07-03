import { Space, Table, Tag } from 'antd';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDeleteSingleProductMutation, useGetProductsByRoleQuery } from '../endpoints/productApiSlice';
import BASE_URL from '../URL/url';
import { useSelector } from 'react-redux';

const Product = () => {

    // const fetcher = useGetProductsByRoleQuery();
    const [refresh, setIsRefresh] = useState(false);
    const [products, setProducts] = useState([]);

    const { token } = useSelector(state => state.auth)
    console.log(token)
    useEffect(() => {
        // const { data } = fetcher;
        // setProducts(data);
        BASE_URL.get('/api/v1/products/by-role', {
            withCredentials: true,
            headers: {
                authorization: `Bearer ${token}`
            }
        }).then(res => setProducts(res.data))

    }, [refresh])

    console.log(products)

    const columns = [
        {
            title: 'Product Name',
            dataIndex: 'product_name',
            key: 'name',
            render: (product_name) => {
                return product_name.length > 25 ? product_name.substring(0, 25).concat(" ...") : product_name
            }
        },
        {
            title: 'Email',
            dataIndex: 'User',
            key: 'name',
            render: (User, i) => {
                return User[0].email
            }
        },
        {
            title: 'Email',
            dataIndex: 'User',
            key: 'name',
            render: (User, i) => {
                return User[0].email
            }
        },
        {
            title: 'Item in stock',
            dataIndex: 'itemsInStock',
            key: 'itemsInStock',
        },
        {
            title: 'Product Price',
            dataIndex: 'product_price',
            key: 'product_price',
        },
        {
            title: 'Rating',
            dataIndex: 'product_rating',
            key: 'product_rating',
        },
        {
            title: 'Action',
            dataIndex: '_id',
            key: 'action',
            render: (_id) => (
                <Space size="middle">
                    <Link to='/update-product' state={{ id: _id }}><EditNoteIcon /></Link>
                    <Link onClick={() => {
                        handleDelete(_id)
                    }}><DeleteForeverIcon /></Link>
                </Space>
            ),
        },
    ];
    // console.log(products[9].User.email)


    const [deleteSingleProduct] = useDeleteSingleProductMutation();
    const handleDelete = async (product_id) => {

        try {
            const res = await deleteSingleProduct(product_id).unwrap();
            refresh ? setIsRefresh(false) : setIsRefresh(true)
            console.log(res)
        } catch {
            setIsRefresh(true)
        }
    }

    return (
        <Table columns={columns} dataSource={products} />
    )
}
export default Product;