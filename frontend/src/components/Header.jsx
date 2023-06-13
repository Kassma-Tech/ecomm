import React from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom'

/*Images */
import starLogo from '../assets/Image/starLogo.png'

/* 3rd Parties */
import { Dropdown, Space } from 'antd';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import { useSelector } from 'react-redux';

const Header = () => {

    const { cartProducts } = useSelector(state => state.cart)

    const quantity = cartProducts.reduce((total, item) => total + item.noOfProduct, 0);

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

    return (
        <Wrapper>
            <div className="header">
                <div className='header__logo'>
                    <Link to="/"><img src={starLogo} alt="" /></Link>
                </div>

                <div className='header__menus'>
                    <Dropdown
                        menu={{
                            items,
                        }}
                    >
                        <Link onClick={(e) => e.preventDefault()}>
                            Categories
                        </Link>
                    </Dropdown>

                    <Link to="/">Event</Link>
                    <Link to="/">What's New</Link>

                </div>

                <div className='header__actions'>
                    <div style={{ display: 'flex' }}><ShoppingCartIcon /><Link to="/cart">Cart: {quantity}</Link></div>
                    <div style={{ display: 'flex' }}><PersonIcon /> <Link to="/login">Sign In</Link></div>

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
export default Header;
