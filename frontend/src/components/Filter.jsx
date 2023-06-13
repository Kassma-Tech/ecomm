import React from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { Dropdown, Space } from 'antd';

const Filter = () => {

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
            <div className="filter">
                <div className='filter__menus'>
                    <Dropdown
                        menu={{
                            items,
                        }}
                    >
                        <Link onClick={(e) => e.preventDefault()}>
                            Categories
                        </Link>
                    </Dropdown>
                </div>
            </div>
        </Wrapper>
    );
}
const Wrapper = styled.div`

    .filter {
        width: 80%;
        margin: 20px auto;
        display: flex;
    }
    .filter__menus {
        background-color: #f4f4f2;
        border-radius: 30px;
        width: 100px;
        padding: 10px 20px;
        text-align: center;
        margin-right: 10px;
    }

    .filter__menus a{
        color: #111;
        text-decoration: none;
    }

`
export default Filter;
