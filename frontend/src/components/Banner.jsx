import React from 'react';
import styled from 'styled-components'

/* Image */
import banner from '../assets/Image/banner.jpg'
const Banner = () => {
    return (
        <Wrapper>
            <div className="banner">
                <img src={banner} alt="" />
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.div` 
.banner {
    width: 80%;
    margin: 0 auto;
}

.banner img {
    object-fit: contain;
    width: 100%;
    height: 100%;
}


`
export default Banner;
