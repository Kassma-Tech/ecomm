import React, { useState } from 'react';
import { Button, Dropdown, Form, Input, Select, message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons'
import { useRegisterMutation } from '../endpoints/authApiSlice';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'buyer'
    });

    const [isLoading, setIsLoading] = useState(false);
    const [register] = useRegisterMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })

        console.log(userData)
    }

    const selectHandler = (value, e) => {
        setUserData({
            ...userData,
            role: e.value
        })
    }

    const submitHandler = async () => {
        setIsLoading(true);
        try {
            const result = await register(userData).unwrap();
            setIsLoading(false);
            dispatch(setCredentials({ token: result.accessToken }));
            message.success("Successfully registered")
            navigate(-1, { replace: true })

        } catch (error) {
            message.error(error.data?.message)
            setIsLoading(false);
        }
    }

    return (
        <div>
            <Form
                name="basic"
                style={{
                    maxWidth: 300,
                    margin: '0 auto'
                }}
                initialValues={{
                    remember: false,
                }}
                autoComplete="off"
                onFinish={submitHandler}
            >
                <Form.Item
                    label="Name"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter your name',
                        },
                    ]}
                >
                    <Input onChange={handleChange} type="name" name="name" />
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
                    <Input onChange={handleChange} type="email" name="email" />
                </Form.Item>

                <Form.Item
                    label="Password"

                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password name="password" onChange={handleChange} />
                </Form.Item>
                <Form.Item
                    label="Role">
                    <Select
                        defaultValue="buyer"
                        style={{ width: 300 }}
                        onSelect={(value, event) => {
                            selectHandler(value, event)
                        }}
                        options={
                            [{ value: 'seller', label: 'Seller' }, { value: 'buyer', label: 'Buyer' }]}
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: 300 }} disabled={isLoading ? true : false}>
                        {isLoading ? <LoadingOutlined size={10} /> : "Register"}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default Register;
