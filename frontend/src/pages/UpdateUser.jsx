import { useUpdateUserMutation } from '../endpoints/userApiSlice';
import React, { useState } from 'react';
import { Button, Form, Input, Select, message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons'

const UpdateUser = () => {

    const [userData, setUserData] = useState({
        name: '',
        email: '',
        role: ''
    });

    const [updateUser] = useUpdateUserMutation();

    const [isLoading, setIsLoading] = useState(false);

    const submitHandler = async () => {
        setIsLoading(true);
        const { name, email, role } = userData;
        try {
            const result = await updateUser(userData).unwrap();
            setIsLoading(false);
            message.success("Updated successfully")

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

    const selectHandler = (value, e) => {
        setUserData({
            ...userData,
            role: e.value
        })
    }

    return (
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
                    label="Role"
                >
                    <Select
                        defaultValue="buyer"
                        style={{ width: 350 }}
                        onSelect={(value, event) => {
                            selectHandler(value, event)
                        }}
                        options={
                            [{ value: 'seller', label: 'Seller' }, { value: 'buyer', label: 'Buyer' }]}
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: 350 }} disabled={isLoading ? true : false}>
                        {isLoading ? <LoadingOutlined size={10} /> : "Register"}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default UpdateUser;
