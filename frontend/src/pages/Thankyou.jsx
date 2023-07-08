import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { PriceFormatter } from '../utils/helper';
import BASE_URL from '../URL/url';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Thankyou = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const { token } = useSelector(state => state.auth);

  if (!token)
    navigate('/login')

  const [orderedProducts, setOrderedProducts] = useState(location.state.order);

  const totalPrice = location.state.totalPrice;

  return (
    <Wrapper>
      <h1>Thanks for shopping with us! Come Back Soon!</h1>
      <div className="cart__items">
        {orderedProducts?.map((product, i) => (
          <div className='cart__item__container' key={i}>
            <div className="product__image">
              <img src={product?.product_image} alt="" />
            </div>

            <div className="product__description">
              <div className="cart__item__title">
                <h6>{product?.product_name?.length > 50 ? product?.product_name.substring(0, 50).concat(" ...") : product.product_name}</h6>
                <h2>{`${PriceFormatter(product.product_price)}`}</h2>
              </div>

              <div className='item__price'>
                <p>Qty: {product.noOfProduct}</p>
                <h6>{PriceFormatter(product.totalItemPrice)}</h6>
              </div>
            </div>
          </div>
        ))}

        <h2 className='h2'>You Paid: {PriceFormatter(totalPrice * 100)}</h2>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
h1 {
    font-size: 1.5rem;
    text-align: center;
    color: #034528
}

.h2 {
    margin-left: 5%;
    font-size: 1.35rem;
    color: #034528
}

.flex1 {
    display: flex;
    justify-content: space-between;
    margin: 20px;
}
span {
    font-size: 1.1rem;
}
.cart__items {
    width: 80%;
}
h6 {
    font-weight: 500;
}

.item__price {
    display: flex;
    justify-content: space-between;
}
.product__description {
  margin: 0 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 50%;
}

.cart__item__container {
  display: flex;
  flex-wrap: wrap;
  margin: 15px;
  padding: 20px ;
  border-bottom: 1px solid rgb(0, 0, 0, 0.2);
  width: 90%;
}

.product__description>* {
  font-size: 1.1rem;
}

.product__description h3 {
  font-size: 1rem;
}

.product__image {
  width: 100px;
  height: 75px;
  background-color: #ececed;
}

.product__image img {
  object-fit: contain;
  width: 100%;
  height: 100%;
}
  .cart {
    width: 90%;
    display: flex;
    margin: 0 auto;
    justify-content: space-between;

  }

  .order {
    background-color: #f9f5f5;
    width: 40%;
    box-shadow: 4px 4px 4px 4px #cbcbcb;
    margin-top: 30px;
    max-height: 200px;
    position: relative;
  }

  span {
    font-weight: 600;
    font-size: 1.5rem;
  }
  .order h4 {
    margin: 50px 20px;
    font-size: 1.2rem;
    font-weight: 500;
  }

  .btn__checkout__item__cart {
  padding: 8px 15px;
  width: 100%;
  border-radius: 30px;
  background-color: #013d2b;
  margin-right: 20px;
  color: #fff;
  border: 2px solid #013d2b;
  cursor: pointer;
  font-size: 1rem !important;
  position: absolute;
  bottom: 0;
}
`
export default Thankyou;
