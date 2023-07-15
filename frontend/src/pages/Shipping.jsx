import React, { useState } from 'react';
import { Button, Form, Space, Input, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { addShippingInfo } from '../features/cartSlice';
import { useNavigate } from 'react-router-dom';
const CheckOut = () => {
    const dispatch = useDispatch();

    const { shippingInfo: initialInfo } = useSelector(state => state.cart);

    const navigate = useNavigate();

    const [shippingInfo, setShippingInfo] = useState({
        first_name: initialInfo?.first_name,
        last_name: initialInfo?.last_name,
        email: initialInfo?.email,
        postal_code: initialInfo?.postal_code,
        city: initialInfo?.city,
        country: initialInfo?.country,
        street: initialInfo?.street
    })


    const handleInput = (e) => {
        setShippingInfo({
            ...shippingInfo,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        dispatch(addShippingInfo(shippingInfo));
        navigate("/checkout")
    }
    return (
        <>
            <div>
                <Form
                    name="basic"
                    style={{
                        maxWidth: 350,
                        margin: '50px auto 0 auto'
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    layout='vertical'
                    autoComplete="on"
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        label="First name"

                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}
                    >
                        <Input onChange={handleInput} type="text" name="first_name" defaultValue={shippingInfo.first_name} />
                    </Form.Item>
                    <Form.Item
                        label="Last Name"

                        rules={[
                            {
                                required: true,
                                message: 'Please input your last Name!',
                            },
                        ]}
                    >
                        <Input onChange={handleInput} type="text" name="last_name" defaultValue={shippingInfo.last_name} />
                    </Form.Item>

                    <Form.Item
                        label="Email"

                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}
                    >
                        <Input onChange={handleInput} type="email" name="email" defaultValue={shippingInfo.email} />
                    </Form.Item>

                    <Form.Item
                        label="Street"

                        rules={[
                            {
                                required: true,
                                message: 'Please input your shipping street!',
                            },
                        ]}
                    >
                        <Input onChange={handleInput} type="text" name="street" defaultValue={shippingInfo.street} />
                    </Form.Item>

                    <Form.Item
                        label="City"

                        rules={[
                            {
                                required: true,
                                message: 'Please input your city!',
                            },
                        ]}
                    >
                        <Input onChange={handleInput} type="text" name="city" defaultValue={shippingInfo.city} />
                    </Form.Item>

                    <Form.Item
                        label="Postal Code"

                        rules={[
                            {
                                required: true,
                                message: 'Please input your postal code!',
                            },
                        ]}
                    >
                        <Input onChange={handleInput} type="number" name="postal_code" defaultValue={shippingInfo.postal_code} />
                    </Form.Item>

                    <Form.Item
                        label="Country"

                        rules={[
                            {
                                required: true,
                                message: 'Please input your country!',
                            },
                        ]}
                    >
                        <Input onChange={handleInput} type="text" name="country" defaultValue={shippingInfo.country} />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Continue
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
}

export default CheckOut;
