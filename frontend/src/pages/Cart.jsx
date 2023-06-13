import React, { useEffect, useState } from "react";
import CartItem from "../components/CartItem";
import styled from "styled-components";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { PriceFormatter } from '../utils/helper'
import { addToCart } from "../features/cartSlice";

function Cart() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { cartProducts } = useSelector((state) => state.cart);
  const quantity = cartProducts.reduce((total, item) => total + item.noOfProduct, 0);
  const totalPrice = cartProducts?.reduce((total, item) => total + item.totalItemPrice, 0)


  console.log(cartProducts);

  return (
    <Wrapper>
      {
        cartProducts.length > 0 ?
          <div className="cart">
            <div className="cart__items">
              {cartProducts?.map((product, i) => (
                <div key={i}>
                  <CartItem
                    product_id={product._id}
                    product_name={product.product_name}
                    product_image={product.product_image}
                    product_price={product.product_price}
                    rating={product.product_rating}
                    noOfReview={product.noOfReview}
                    itemsInStock={product.itemsInStock}
                    quantity={product.noOfProduct}
                  />
                </div>
              ))}
            </div>

            <div className="cart__checkout">
              <h4 >{`Subtotal(${quantity} items) : ${PriceFormatter(totalPrice)}`}</h4>
              <Link to="/login">
                <button className='btn__checkout__item__cart'>Proceed to checkout</button>
              </Link>
            </div>
          </div>
          : <h1>The cart is empty</h1>
      }
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .cart {
    width: 90%;
    display: flex;
    margin: 0 auto;
  }
  .cart__items {
    width: 80%;
  }

  .cart__checkout {
    max-height: 150px;
    background-color: #f9f5f5;
    width: 25%;
    position: relative;
    box-shadow: 4px 4px 4px 4px #cbcbcb;
  }

  span {
    font-weight: 600;
    font-size: 1.5rem;
  }
  .cart__checkout h4 {
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

export default Cart;
