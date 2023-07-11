import React, { useState } from 'react';
import { Button, Form, Input, Select, message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons'
import { useChangePasswordMutation } from '../endpoints/authApiSlice';

const UpdatePassword = () => {

    const [userData, setUserData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [changePassword] = useChangePasswordMutation();

    const [isLoading, setIsLoading] = useState(false);

    const submitHandler = async () => {
        if (userData.newPassword !== userData.confirmPassword)
            return message.error("Please confirm password correctly")
        setIsLoading(true);
        try {
            const result = await changePassword(userData).unwrap();
            setIsLoading(false);
            message.success("Password updated successfully")

        } catch (error) {
            message.error(error.data?.message)
            setIsLoading(false);
        }
    }

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div>
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                }}
                initialValues={{
                    remember: true,
                }}
                autoComplete="off"
                onFinish={submitHandler}
            >
                <Form.Item
                    label="Password"

                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password name="currentPassword" onChange={handleChange} />
                </Form.Item>
                <Form.Item
                    label="New Password"

                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password name="newPassword" onChange={handleChange} />
                </Form.Item>
                <Form.Item
                    label="Confirm Password"

                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password name="confirmPassword" onChange={handleChange} />
                </Form.Item>
                <Form.Item

                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit" style={{ width: 400 }} disabled={isLoading ? true : false}>
                        {isLoading ? <LoadingOutlined size={10} /> : "Register"}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default UpdatePassword;
