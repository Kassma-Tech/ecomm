import { Button, Checkbox, Form, Input, message } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../endpoints/authApiSlice';
import { setCredentials } from '../features/authSlice';
import { useGetCartQuery } from '../endpoints/cartApiSlice';
import { setCart } from '../features/cartSlice';
import useCartProducts from '../hooks/useCartProducts';
import BASE_URL from '../URL/url';
import { LoadingOutlined } from '@ant-design/icons'

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(false);
    const [login] = useLoginMutation();
    const [isLoading, setIsLoading] = useState(false);

    const data = useCartProducts();

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

    const submitHandler = async () => {
        setIsLoading(true);

        const result = await login(loginInfo).unwrap().catch(err => message.error(err?.data?.message));

        dispatch(setCredentials({ token: result?.accessToken }));

        await BASE_URL.put('/api/v1/cart/updatecart', JSON.parse(localStorage.getItem('cartProducts')), {
            withCredentials: true,
            headers: {
                "authorization": `Bearer ${result?.accessToken}`
            }
        }).then(res => console.log(res.data))
            .catch(err => console.log(err));


        await BASE_URL.get('/api/v1/cart', {
            withCredentials: true,
            headers: {
                "authorization": `Bearer ${result?.accessToken}`
            }
        }).then(res => {
            dispatch(setCart({ cartItems: res.data.data }));
            localStorage.setItem('cartProducts', JSON.stringify(res.data.data));
        }).catch(err => console.log(err)).finally(setIsLoading(false))

        navigate(-1, { replace: true });
    }

    return (
        <>
            <Form
                name="basic"

                layout='vertical'
                style={{
                    maxWidth: 300,
                    margin: '50px auto 0 auto'
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

                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: 300 }}>
                        {isLoading ? <LoadingOutlined size={10} /> : "Sign In"}
                    </Button>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" style={{ width: 300 }}>
                        <Link to='/register' style={{ textDecoration: 'none' }}>Create an account</Link>
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
};
export default Login;