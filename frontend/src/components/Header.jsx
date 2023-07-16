import React, { useState } from 'react';
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'

/*Images */
import starLogo from '../assets/Image/starLogo.png'

/* 3rd Parties */
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

const Header = () => {

    const token = useSelector(state => state.auth.token);
    const { cartProducts } = useSelector(state => state.cart)

    const quantity = cartProducts?.reduce((total, item) => total + item.noOfProduct, 0);

    const [logout] = useLogoutMutation();
    const dispatch = useDispatch();

    const logOutHandler = async () => {
        setIsCollapse(true)
        try {
            await logout();
            dispatch(setCart({ cartItems: [] }));
            localStorage.removeItem('cartProducts')
            dispatch(setCredentials({ token: null }))
        } catch (error) {
            console.log(error)
        }
    }

    const [collapse, setIsCollapse] = useState(false);
    const expandHandler = () => {
        collapse ? setIsCollapse(false) : setIsCollapse(true);
    }
    return (
        <Wrapper>
            <div className="header">
                <div className='header__logo'>
                    <Link to="/"><img src={starLogo} alt="" /></Link>
                </div>

                <div className={collapse ? 'header__menus responsive' : 'header__menus'}>

                    <Link onClick={(e) => { e.preventDefault(); setIsCollapse(false); }}>
                        Categories
                    </Link>

                    <Link to="/events" onClick={() => { setIsCollapse(false) }}>Event</Link>
                    <Link to="/" onClick={() => { setIsCollapse(false) }}>What's New</Link>

                    <div className='header__desktop'>
                        {!token
                            ? <div style={{ display: 'flex' }}><PersonIcon /> <Link to="/login" onClick={() => { setIsCollapse(false) }}>Sign In</Link></div>
                            : <div style={{ display: 'flex' }}><PersonIcon /> <Link onClick={logOutHandler}>Sign Out</Link></div>}

                        {!token ? <div style={{ display: 'flex' }}><PersonIcon /> <Link to='/register' onClick={() => { setIsCollapse(false) }}>Register</Link></div>
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

                <div className='mobile__menu mobile__cart' ><ShoppingCartIcon /><Link to="/cart">Cart: {quantity}</Link></div>

                <div className={'header__actions mobile__sub__menu'}>
                    <div className='header__actions' style={{ display: 'flex' }}><ShoppingCartIcon /><Link to="/cart">Cart: {quantity}</Link></div>

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

                <div className="mobile__menu" onClick={expandHandler}>
                    {collapse ? <ClearIcon /> : <MenuIcon />}
                </div>
            </div>
        </Wrapper>
    );
}


const Wrapper = styled.div`
    position: relative;
    top: 0;
        right: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        z-index: 999;
        box-shadow: 0px -5px 10px 0px rgba(0, 0, 0, 0.5);
        
.mobile__menu {
    display: none;
}

.header__desktop {
    display: none;
}
  .header {
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding:10px 0;

  }
  .header>* {
    font-size: 1.1rem;
  }

  .header__menus a,  .header__actions a , .mobile__cart a{
    margin: 0 10px;
    text-decoration: none;
    color: #111;
    font-size: 1rem;
    font-weight: 500;
  }
  .mobile__cart a {
    text-align: right;
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

   .none {
        display: none;
    }
    
    .mobile__sub__menu {
        /* display: block; */
    }
@media screen and (max-width: 1024px) {
    .mobile__sub__menu {
        display: none;
    }

    .header__desktop {
        display: block;
    }
    .mobile__menu {
        display: block;
    }
    .header {
        width: 100% !important;
    }

    .header__menus {
        transition: ease 0.8s;
        background-color: #034528;
        width: 200px;
        padding: 20px;
        z-index: 999;  
        display: none;
    }

    
    
    .responsive {
        position: absolute;
        top: 100%;
        right: 0%;
        width: 0;
        display: flex;
        flex-direction: column;
        transition: ease 0.8s;
        background-color: #034528;
        width: 200px;
        padding: 20px;
        z-index: 999; 
    }

    .responsive a {
        margin: 10px 10px !important;;
        text-decoration: none !important;;
        color: #fff !important;;
        font-size: 1rem !important;;
        font-weight: 500 !important;;
    }
    .header__actions {

    }
}
`
export default Header;
