import React from 'react';
import styled from 'styled-components';

const Button = () => {
    return (
        <Wrapper>
            <button className='btn'>Click Me</button>
        </Wrapper>
    );
}

const Wrapper = styled.div`

    .btn {
        padding: 15px 30px;
        width: 200px;
        background-color: #013d2b;
        margin-right: 20px;
        color: #fff;
        border-radius: 30px;
        cursor: pointer;
    }

`
export default Button;
