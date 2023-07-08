import React, { useEffect, useState } from 'react';
import BASE_URL from '../URL/url';
import { useSelector } from 'react-redux';
import { Space, Table, Tag } from 'antd';
import { useUpdateShippingStatusMutation } from '../endpoints/orderApiSlice';

const Order = () => {

    const [order, setOrder] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { token } = useSelector(state => state.auth);

    const [updateShippingStatus] = useUpdateShippingStatusMutation();



    useEffect(() => {

        BASE_URL.get('/api/v1/order', {
            withCredentials: true,
            headers: {
                authorization: `Bearer ${token}`
            }
        }).then(res => setOrder(res.data)).
            catch(err => console.log(err))
            .finally(setIsLoading(false))

    }, [refresh])

    console.log(order)

    const columns = [
        {
            title: 'OrderId',
            dataIndex: 'orderId',
            key: 1,
        },
        {
            title: 'Product Name',
            dataIndex: 'product_name',
            key: 2,
        },
        {
            title: 'Product Price',
            dataIndex: 'product_price',
            key: 3,
        },
        {
            title: 'No of Product',
            dataIndex: 'noOfProduct',
            key: 4,
        },
        {
            title: 'Total Price',
            dataIndex: 'totalItemPrice',
            key: 5,
        },
    ];
    const handleDelete = async (product_id) => {

    }

    return (
        isLoading ? <h1>Loading...</h1> :
            <Table columns={columns} dataSource={order} />
    )
}

export default Order;
