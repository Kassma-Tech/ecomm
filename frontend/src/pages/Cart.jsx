import React from "react";
import CartItem from "../components/CartItem";
import styled from "styled-components";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PriceFormatter } from '../utils/helper'
import { Button } from 'antd';

function Cart() {

  const { cartProducts } = useSelector((state) => state.cart);
  const quantity = cartProducts.reduce((total, item) => total + item.noOfProduct, 0);
  const totalPrice = cartProducts?.reduce((total, item) => total + item.totalItemPrice, 0)

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
                    totalItemPrice={product.totalItemPrice}
                    noOfProduct={product.noOfProduct}
                  />
                </div>
              ))}
            </div>

            <div className="cart__checkout">
              <h4 >{`Subtotal(${quantity} items) : ${PriceFormatter(totalPrice)}`}</h4>
              <Link to="/shipping">
                <button className='btn__checkout__item__cart'>Proceed to checkout</button>
              </Link>
            </div>
          </div>
          :
          <>
            <h1>The cart is empty</h1>
            <Button type="primary" style={{ width: 320 }}  >
              <Link to='/'>
                Navigate to product page
              </Link>
            </Button>
          </>
      }
    </Wrapper>
  );
}

const Wrapper = styled.div`
  a {
    text-decoration: none;
  }
  .cart {
    width: 90%;
    display: flex;
    position: relative;
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
    margin-top: 50px;
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


.cart {
  border-bottom: 1px solid rgba(26, 24, 24, 0.4);
  width: 90%;
  margin: 0 auto;
}

.cart__item__container {
  color: #fff;
  display: flex;
  flex-wrap: wrap;
  margin: 50px;
  width: 100%;
}

.cart__item__description {
  margin: 30px;
  display: flex;
  width: 65%;
  flex-direction: column;
  justify-content: space-between;
}

.cart__item__description>* {
  font-size: 1.1rem;
}

.cart__item__description h3 {
  font-size: 1rem;
}

.cart__item__image {
  width: 150px;
  height: 180px;
  background-color: #ececed;
}

.cart__item__image img {
  object-fit: contain;
  width: 100%;
  height: 100%;
}

.cart__item__title {
  display: flex;
  justify-content: space-between;
}

.btn__remove__item__cart {
  padding: 8px 15px;
  width: 150px;
  background-color: #fff;
  margin-right: 20px;
  color: #013d2b;
  border-radius: 30px;
  border: 2px solid #013d2b;
  cursor: pointer;
  font-size: 0.7rem !important;
}

.loading {
  position: absolute;
  left: 50%;
  top: 50%;
}

.cart__qty_update__button input {
  padding: 5px 10px;
  width: 30px;
  margin-right: 10px;
  background-color: #fff;
  border: #013d2b solid 2px;
}

.cart__qty_update__button button {
  padding: 6px 15px;
  width: 100px;
  background-color: #fff;
  margin-right: 20px;
  color: #013d2b;
  border-radius: 30px;
  border: 2px solid #013d2b;
  cursor: pointer;
}

.cart__qty_update__button button:hover {
  background-color: #013d2b;
  border: 3px solid #013d2b;
  color: #fff;
}

@media screen and (max-width: 960px) {
  /* Cart */
  .cart__item__description {
    width: 400px;
    margin: 10px 0;
  }
}

@media screen and (max-width: 680px) {
  /*Cart */
  .cart {
    width: 100%;
    flex-wrap: wrap;
  }

  .cart__item__description {
    margin: 10px 0;
  }

  .cart__item__image {
  width: 150px;
  height: 120px;
  background-color: #ececed;
}
  .cart__checkout {
    max-height: 150px;
    background-color: #f9f5f5;
    width: 90%;
    box-shadow: 4px 4px 4px 4px #cbcbcb;
    margin-top: 50px;
  }
}

@media screen and (max-width: 1160px) {
  .cart {
    flex-wrap: wrap;
  }
  .cart__checkout {
    max-height: 150px;
    background-color: #f9f5f5;
    width: 80%;
    margin: 0 auto 80px auto;
    box-shadow: 4px 4px 4px 4px #cbcbcb;
    margin-top: 50px;
  }
}
`

export default Cart;
