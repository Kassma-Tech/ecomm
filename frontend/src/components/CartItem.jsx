import React from 'react'
import Rating from './Rating';
import styled from 'styled-components'
import { useDispatch } from 'react-redux';
import { removeFromCart, updateCartQuantity } from '../features/cartSlice';
import { PriceFormatter } from '../utils/helper';
import { useRemoveCartMutation } from '../endpoints/cartApiSlice';

function CartItem({ product_id, product_name, product_image, product_price, quantity, rating, noOfReview, itemsInStock }) {

  const dispatch = useDispatch();
  const [removeCart] = useRemoveCartMutation();

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id))
  }

  const updateCartHandler = async (id, value) => {
    try {
      const res = await removeCart(id).unwrap();
      console.log(res)
    } catch (error) {
      console.log(error)
    }
    dispatch(updateCartQuantity({ id, value }))
  }

  return (
    <Wrapper>
      <div className='cart'>
        <div className="cart__item__container">
          <div className="cart__item__image">
            <img src={product_image} alt="" />
          </div>
          <div className="cart__item__description">
            <div className="cart__item__title">
              <h4>{product_name}</h4>
              <h2>{`${PriceFormatter(product_price)}`}</h2>
            </div>
            <div className="product__rating">
              <div>
                <Rating rating={rating} />
                <p>{noOfReview} reviews</p>
              </div>

              <div className="cart__operation">
                <select defaultValue={quantity} onChange={(e) => { updateCartHandler(product_id, e.target.value) }}>
                  {
                    Array.from({ length: itemsInStock }, (_, x) => (
                      <option key={x} value={x + 1}>{x + 1}</option>
                    ))
                  }
                </select>
                <button onClick={() => { handleRemoveFromCart(product_id) }} className='btn__remove__item__cart btn'>Remove from Cart</button>

              </div>
            </div>
          </div>

        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
.cart {
  border-bottom: 1px solid rgba(26, 24, 24, 0.4);
}

.cart__item__title, .cart__item__container h3 {
    color: #111;
}
.cart__item__container {
  color: #fff;
  display: flex;
  flex-wrap: wrap;
  margin: 15px;
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
  width: 25%;
  height: 200px;
  background-color: #ececed;
}

.cart__item__image img {
  object-fit: contain;
  width: 100%;
  height: 100%;
}

select {
  margin-right: 10px;
  border: 2px solid #013d2b;
}
.cart__operation {
  display: flex;
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
  font-size: 0.85rem !important;
  font-weight: 600;
  box-shadow: 2px 2px 2px 2px #cbcbcb;

}


`

export default CartItem