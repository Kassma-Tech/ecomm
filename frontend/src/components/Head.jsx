import React, { useState } from 'react';
import styled from 'styled-components';
import { UserOutlined, MenuOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
// import evandagi from '../assets/image/evangadi.png'
import { Dropdown, Select, Space } from 'antd';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import ClearIcon from '@mui/icons-material/Clear';
import MenuIcon from '@mui/icons-material/Menu';
import HistoryIcon from '@mui/icons-material/History';
import { useDispatch, useSelector } from 'react-redux';
import { useLogoutMutation } from '../endpoints/authApiSlice';
import { setCredentials } from '../features/authSlice';
import { setCart } from '../features/cartSlice';
const Head = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const navMenuHandler = () => {
        setIsCollapsed(!isCollapsed);
    }

    const token = useSelector(state => state.auth.token);
    const { cartProducts } = useSelector(state => state.cart)

    const quantity = cartProducts?.reduce((total, item) => total + item.noOfProduct, 0);

    const [logout] = useLogoutMutation();
    const dispatch = useDispatch();

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

    return (

        <Wrapper>
            <a className='nav__logo' href="">
                <img src={'X'} alt="Evangadi Logo" />
            </a>

            <ul className={isCollapsed ? 'nav_middle start' : 'nav_middle'}>
                <li>
                    <Link onClick={(e) => e.preventDefault()}>
                        Categories
                    </Link>
                </li>
                <li> <Link to="/">Event</Link> </li>
                <li> <Link to="/">What's New</Link> </li>
            </ul>

            <div className="nav__signIn">
                <div style={{ display: 'flex' }}><ShoppingCartIcon /><Link to="/cart">Cart: {quantity}</Link></div>

                <div className='header__actions'>

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

                <MenuOutlined onClick={navMenuHandler} className='nav__menu' style={{ marginLeft: '30px' }} />


            </div>
        </Wrapper >

    );
}


const Wrapper = styled.header`
        position: fixed;
        background-color: #fff;
        padding: 20px 10%;
        color: #111;
        width: 100%;
        top: 0;
        right: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        z-index: 999;
        box-shadow: 0px -5px 10px 0px rgba(0, 0, 0, 0.5);

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
   
        .nav__logo {
            width: 250px;
            height: 35px;
        }
        img {
            object-fit: contain;
            width: 100%;
            height: 100%;
        }
        .nav_middle, .nav__signIn {
            display: flex;
            align-items: center;
        }

        .nav_middle li {
            margin: 0 30px;
        list-style: none;
        font-weight: 600;
        }

        .nav__logo {
            margin-left: 20%;
        }
        .nav_middle a.active {
            color: #2f2f2f;
        }

        .nav__signIn a {
            display: flex;
        align-items: center;
        color: #111;
        }

        .nav__menu {
            display: none;
        }
        a{
            text-decoration: none;
        color: #111;
        }

        @media (max-width: 1280px) {
            padding: 15px 2%;
        transition: .2s; 
        }

        @media (max-width: 1100px) {
        .nav__menu {
            display: block;
        }

        .nav__logo {
            width: 150px;
            height: 35px;
        }

        .nav_middle {
            position: absolute;
        top: 100%;
        right: -100%;
        width: 200px;
        background-color: #becb0a;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        transition: all .5s ease;
        }
        .nav_middle li:first-child {
            margin: 0
        }
        .nav_middle li {
            margin: 12px 0;
        padding: 0 25px;
        transition: all .5s ease;
        }

        .nav_middle a:hover {
            color: #fff;
        }
        .start {
            right: 0%
        }
 }
            `

export default Head;
