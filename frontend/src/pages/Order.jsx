import React, { useEffect, useState } from 'react';
import BASE_URL from '../URL/url';
import { useSelector } from 'react-redux';
import { Select, Space, Table, Tag, message } from 'antd';
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

    const handleSubmit = async (shippingStatus, orderId, productId) => {
        try {
            await updateShippingStatus({ orderId, shippingStatus: shippingStatus.toLowerCase(), productId }).unwrap();
            setRefresh(!refresh)
        } catch (error) {
            message.error('something went wrong')
        }

    }
    const columns = [
        {
            title: 'OrderId',
            dataIndex: 'orderId',
        },
        {
            title: 'Product Name',
            dataIndex: 'product_name',
            render: (product_name) => (
                product_name?.length > 30 ? product_name.substring(0, 30).concat(' ...') : product_name
            )
        },
        {
            title: 'Product Price',
            dataIndex: 'product_price',
        },
        {
            title: 'No of Product',
            dataIndex: 'noOfProduct',
        },
        {
            title: 'Total Price',
            dataIndex: 'totalItemPrice',
        },
        {
            title: 'Shipping Status',
            dataIndex: 'shippingStatus',
            render: (_, { shippingStatus }) => (
                <>
                    <Tag color={shippingStatus === 'pending' ? 'blue' : shippingStatus === 'delivered' ? 'green' : 'volcano'}>
                        {shippingStatus}
                    </Tag>

                </>
            ),
        },
        {
            title: 'Update Shipping Status',
            dataIndex: 'shippingStatus',

            render: (_, { shippingStatus, orderId, productId }) => {
                return (

                    shippingStatus !== 'delivered' &&
                    <Select
                        defaultValue={shippingStatus}
                        style={{
                            width: 120,
                        }}
                        onSelect={(value) => { handleSubmit(value, orderId, productId) }}
                        options={[
                            {
                                value: 'pending',
                                label: 'pending',
                            },
                            {
                                value: 'readyForDispatch',
                                label: 'Ready For Dispatch',
                            },
                            {
                                value: 'outForDelivery',
                                label: 'Out For Delivery',
                            },
                            {
                                value: 'delivered',
                                label: 'Delivered',
                            },
                            {
                                value: 'cancelled',
                                label: 'Cancelled',
                            },

                        ]}
                    />

                )
            },
        },
    ];

    return (
        isLoading ? <h1>Loading...</h1> :
            <Table columns={columns} dataSource={order} rowKey={'orderId'} />
    )
}

export default Order;
