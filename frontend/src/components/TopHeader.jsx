import React from 'react';
import styled from 'styled-components'

const TopHeader = () => {
    return (
        <Wrapper>
            <div className="top__header">
                <div className='top__header_phone'>
                    <h4>0911090000</h4>
                </div>
                <div className='top__header_detail'>
                    <p>50% cut for all ethiopian products</p>
                </div>
                <div className='top__header_language'>
                    Eng
                </div>
            </div>

        </Wrapper>
    );
}

const Wrapper = styled.div`
    .top__header {
        display: flex;
        justify-content: space-between;
        background-color: #034528;
        color: #fff;
        padding: 10px;
    }

`
export default TopHeader;
