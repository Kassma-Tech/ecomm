import React from 'react';
import styled from 'styled-components';
import Rating from './Rating';
import { Link } from 'react-router-dom';
import { PriceFormatter } from '../utils/helper';

const Product = ({ product }) => {
    return (
        <Wrapper>
            <div className="product">
                <div className="product__image">
                    <Link to={`/product/${product._id}`}>
                        <img src={product.product_image} alt="" />
                    </Link>
                </div>
                <div className="product__detail">
                    <div className="product__name__pricing">
                        <h2>{product.product_name}</h2>
                        <h1>{`${PriceFormatter(product.product_price)}`}</h1>
                    </div>
                    <div className="product__description">
                        <p>Lorem ipsum dolor sit amet consectetur</p>
                    </div>
                    <div className="product__rating">
                        {product.noOfReview === 0 ? 'no review yet' : <Rating rating={product.product_rating} />}
                    </div>
                </div>
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 80%;
    margin: 0;


    .title {font-size: 1.6rem; font-weight: 700}
    .product {
        width: 250px;
        height: 400px;
        max-height: 400px;
        /* margin-right: 10px; */
    }

    .product__image {
        width: 100%;
        height: 200px;
        background-color: #f4f4f2;
        margin-bottom: 10px;
    }

    .product__image img{
        object-fit: contain;
        width: 100%;
        height: 100%
    }
    .product__detail {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .product__name__pricing {
        display: flex;
        justify-content: space-between;
    }

    button {
        padding: 10px 20px;
        width: 150px;
        background-color: transparent;
        margin: 20px 0 0 0;
        color: #111;
        border-radius: 30px;
        border: 2px solid #034528;
        cursor: pointer;
    }
`

export default Product;
