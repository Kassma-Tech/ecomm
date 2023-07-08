import React from 'react';
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'

/*Images */
import starLogo from '../assets/Image/starLogo.png'

/* 3rd Parties */
import { Dropdown, Select, Space } from 'antd';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import HistoryIcon from '@mui/icons-material/History';
import { useDispatch, useSelector } from 'react-redux';
import { useLogoutMutation } from '../endpoints/authApiSlice';
import { setCredentials } from '../features/authSlice';
import { setCart } from '../features/cartSlice';
import jwt_decode from 'jwt-decode'

const DashboardHeader = () => {

    const token = useSelector(state => state.auth.token);
    const { cartProducts } = useSelector(state => state.cart)

    const quantity = cartProducts?.reduce((total, item) => total + item.noOfProduct, 0);

    const [logout] = useLogoutMutation();
    const dispatch = useDispatch();

    const items = [
        {
            label: (
                <Link target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    1st menu item
                </Link>
            ),
            key: '0',
        },
        {
            label: (
                <Link target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                    2nd menu item
                </Link>
            ),
            key: '1',
        },
        {
            type: 'divider',
        },
        {
            label: '3rd menu item（disabled）',
            key: '3',
            disabled: true,
        },
    ];

    const items1 = [
        {
            label: (
                <Link to='/profile'>
                    <PersonIcon /> Profile
                </Link>
            ),
            key: '0',
        },
        {
            label: (
                <Link to='purchase-history'>
                    <HistoryIcon /> Purchase History
                </Link>
            ),
            key: '1',
        }
    ]
    const logOutHandler = async () => {
        try {
            await logout();
            dispatch(setCart({ cartItems: [] }));
            localStorage.removeItem('cartProducts')
            dispatch(setCredentials({ token: null }))
        } catch (error) {
            console.log(error)
        }
    }

    let decoded
    if (token) {
        decoded = jwt_decode(token)
    }

    return (
        <Wrapper>
            <div className="header">
                <div className='header__logo'>
                    <Link to="/"><img src={starLogo} alt="" /></Link>
                </div>

                <div className='header__menus'>
                        <Link to='/my-product'>
                        {decoded?.role === 'admin'? 'Products' : 'My products'}
                            
                        </Link>
                    

                    <Link to="/">Sold products</Link>
                    <Link to="/add-product">Add new product</Link>

                </div>

                <div className='header__actions'>
                    <div style={{ display: 'flex' }}><ShoppingCartIcon /><Link to="/cart">Cart: {quantity}</Link></div>

                    {!token
                        ? <div style={{ display: 'flex' }}><PersonIcon /> <Link to="/login">Sign In</Link></div>
                        : <div style={{ display: 'flex' }}><PersonIcon /> <Link onClick={logOutHandler}>Sign Out</Link></div>}

                    {!token ? <div style={{ display: 'flex' }}><PersonIcon /> <Link to='/register'>Register</Link></div>
                        : <Dropdown
                            menu={{
                                items: [
                                    {
                                        label: (
                                            <Link to='/profile'>
                                                <PersonIcon /> Profile
                                            </Link>
                                        ),
                                        key: '0',
                                    },
                                    {
                                        label: (
                                            <Link to='purchase-history'>
                                                <HistoryIcon /> Purchase History
                                            </Link>
                                        ),
                                        key: '1',
                                    }
                                ],
                            }}
                        >
                            <Link onClick={(e) => e.preventDefault()}>
                                Profile
                            </Link>
                        </Dropdown>

                    }
                </div>
            </div>
        </Wrapper>
    );
}


const Wrapper = styled.div`
  .header {
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:10px 0;
  }
  .header>* {
    font-size: 1.1rem;
  }

  .header__menus a,  .header__actions a{
    margin: 0 10px;
    text-decoration: none;
    color: #111;
    font-size: 1rem;
    font-weight: 500;
  }
  .header__actions div {
    margin: 0 10px !important;
  }

  .header__logo {
    width: 100px;
  }
  .header__logo img {
    object-fit: contain;
    width: 100%;
    height: 100%;
    padding-top: 10px;
  }

  .header__actions  {
    display: flex;
    }
`
export default DashboardHeader;