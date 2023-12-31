import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { PriceFormatter } from '../utils/helper'
import { PayPalButton } from 'react-paypal-button-v2';
import { useGetClientIdQuery } from '../endpoints/paymentApiSlice';
import { usePlaceOrderMutation } from '../endpoints/orderApiSlice';
import { useNavigate } from 'react-router-dom';
import { setCart } from '../features/cartSlice';

const Checkout = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cartProducts } = useSelector((state) => state.cart);
    const { shippingInfo } = useSelector(state => state.cart);
    const quantity = cartProducts.reduce((total, item) => total + item.noOfProduct, 0);
    const totalPrice = cartProducts?.reduce((total, item) => total + item.totalItemPrice, 0)
    const [clientId, setClientId] = useState("");
    const getClient = useGetClientIdQuery();
    const [placeOrder] = usePlaceOrderMutation();

    useEffect(() => {
        const { data } = getClient;

        if (data?.clientId != undefined)
            setClientId(data?.clientId)

    }, [getClient])

    const successHandler = async (PaymentResult) => {
        try {
            const result = await placeOrder({
                PaymentResult,
                shippingInfo,
                cartProducts
            }).unwrap();

            console.log(result)
            localStorage.removeItem('cartProducts');

            dispatch(setCart({ cartItems: [] }));

            navigate('/thanks', { state: result })

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Wrapper>
            <h1>Order summary</h1>
            {
                <div className="cart">
                    <div className="cart__items">
                        {cartProducts?.map((product, i) => (
                            <div className='cart__item__container' key={i}>
                                <div className="product__image">
                                    <img src={product.product_image} alt="" />
                                </div>
                                <div className="product__description">
                                    <div className="cart__item__title">
                                        <h6>{product?.product_name?.length > 50 ? product?.product_name.substring(0, 50).concat(" ...") : product?.product_name}</h6>
                                        <h2>{`${PriceFormatter(product.product_price)}`}</h2>
                                    </div>

                                    <div className='item__price'>
                                        <p>Qty: {product.noOfProduct}</p>
                                        <h6>{PriceFormatter(product.totalItemPrice)}</h6>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="order">
                        <div className='flex1'>
                            <span>Quantity</span>
                            <span>{quantity}</span>
                        </div>

                        <div className='flex1'>
                            <span>Total Price</span>
                            <span>{PriceFormatter(totalPrice)}</span>
                        </div>

                        {clientId.length > 0 && <PayPalButton amount={totalPrice} onSuccess={successHandler} options={{
                            currency: 'USD',
                            clientId: clientId,
                            vault: false,
                            intent: 'capture'
                        }}></PayPalButton>}

                    </div>
                </div>
            }
        </Wrapper>
    );
}
const Wrapper = styled.div`
h1 {
    font-size: 1.5rem;
    text-align: center;
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
  width: 100%;
}

.cart__item__container {
  display: flex;
  margin: 15px;
  padding: 20px ;
  border-bottom: 1px solid rgb(0, 0, 0, 0.2);
  width: 95%;
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
    width: 50%;
    margin: 0 auto 80px auto;
    box-shadow: 4px 4px 4px 4px #cbcbcb;
    margin-top: 50px;
  }
  .order {
    margin: 0 auto;
    background-color: #f9f5f5;
    width: 80%;
    
  }

  .cart__item__title h2 {
    font-size: 1.1rem }

}
`
export default Checkout;
