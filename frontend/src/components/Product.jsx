import React from 'react';
import styled from 'styled-components';
import Rating from './Rating';
import { Link } from 'react-router-dom';
import { PriceFormatter } from '../utils/helper';

const Product = ({ product }) => {
    return (
        // <Wrapper>
        //     <div className="product">
        //         <div className="product__image">
        //             <Link to={`/product/${product._id}`}>
        //                 <img src={product.product_image} alt="" />
        //             </Link>
        //         </div>
        //         <div className="product__detail">
        //             <div className="product__name__pricing">
        //                 <h2>{product.product_name}</h2>
        //                 <h1>{`${PriceFormatter(product.product_price)}`}</h1>
        //             </div>
        //             <div className="product__description">
        //                 <p>Lorem ipsum dolor sit amet consectetur</p>
        //             </div>
        //             <div className="product__rating">
        //                 {product.noOfReview === 0 ? 'no review yet' : <Rating rating={product.product_rating} />}
        //             </div>
        //         </div>
        //     </div>
        // </Wrapper>
        <Wrapper className=" col-sm-6 col-md-4 col-lg-3 mb-4 mb-lg-4 ">
            <div className="card product">
                <div className='product__image'>
                    <Link to={`/product/${product._id}`}>
                        <img src={product.product_image}
                            className="card-img-top" alt="Laptop" />
                    </Link>
                </div>
                <div className="card-body">
                    <div className="d-flex justify-content-between mb-3">
                        <div className='d-flex title__container '>
                            <h5 className="mb-0 mr-2 title">{product.product_name}</h5>
                            <h4 className="text-dark mb-0 price">{`${PriceFormatter(product.product_price)}`}</h4>
                        </div>
                    </div>

                    <div className="d-flex justify-content-between mb-2">
                        <p className="text-muted mb-0">Review <span className="fw-bold">{product.noOfReview}</span></p>
                        <div className="ms-auto text-warning">
                            {<Rating rating={product.product_rating} />}
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.div`

    .title__container{width: 100%}
    h5{width: 75%}
    h4{width: 25%; text-align: right}
    .title {font-size: 1.1rem; font-weight: 500}
    .price {font-size: 1.1rem; font-weight: 600}
    .product {
        width: 100%;
        height: 350px;
        max-height: 350px;
        padding: 0 !important;
        margin: 0 !important;
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
