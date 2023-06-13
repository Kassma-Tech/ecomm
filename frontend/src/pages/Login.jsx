import { Button, Checkbox, Form, Input } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../endpoints/authApiSlice';
import { setCredentials } from '../features/authSlice';

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login] = useLoginMutation();

    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    })

    const handleLogin = (e) => {
        setLoginInfo({
            ...loginInfo,
            [e.target.name]: e.target.value
        })
    }

    // const location = useLocation();
    const submitHandler = async () => {

        const result = await login(loginInfo).unwrap();
        console.log(result?.accessToken)
        dispatch(setCredentials({ token: result?.accessToken }))
        const { from } = location.state || { from: location };
        navigate(-1, { replace: true });
        // <Navigate to="/login" state={{ from: location }} replace />

    }

    return (
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
                label="Email"
                rules={[
                    {
                        required: true,
                        message: 'Please input your email!',
                    },
                ]}
            >
                <Input onChange={handleLogin} type="email" name="email" />
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
                <Input.Password name="password" onChange={handleLogin} />
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
};
export default Login;