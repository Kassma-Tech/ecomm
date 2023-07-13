/* Dependencies */
import React, { useEffect, useState } from "react";
import product from "../data/data";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProduct } from "../features/productSlice";
import Loading from "../components/Loading";
import { addToCart } from "../features/cartSlice";
import { PriceFormatter } from "../utils/helper";
import { message } from "antd";
import { useGetSingleProductQuery } from "../endpoints/productApiSlice";
import { useCartMutation } from "../endpoints/cartApiSlice";
import useCartProducts from "../hooks/useCartProducts";
/*components */

function SingleProduct(props) {
  const [itemCount, setItemCount] = useState(1);
  const { id } = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  const cartProd = useCartProducts();
  const messages = (type, content) => {
    messageApi.open({
      type: type,
      content: content,
    });
  };

  const dispatch = useDispatch();
  const { data: singleProduct = {} } = useGetSingleProductQuery(id);
  const [cart] = useCartMutation();

  const cartProducts = useSelector((state) => state.cart.cartProducts);
  const token = useSelector((state) => state.auth.token);

  console.log(singleProduct)
  const products = singleProduct;

  const selectedProduct = cartProducts?.find(item => singleProduct._id === item._id)

  const increase = () => {
    if (singleProduct.itemsInStock > itemCount)
      setItemCount(itemCount + 1);
  };

  const decrease = () => {
    if (itemCount > 1)
      setItemCount(itemCount - 1);
  };

  const addToCartHandler = async (product) => {
    if (selectedProduct?.itemsInStock < itemCount + selectedProduct?.noOfProduct) {
      messages('error', `Only ${selectedProduct?.itemsInStock - selectedProduct?.noOfProduct} item left`);
    }
    else {
      dispatch(addToCart({ product, itemCount }));

      if (token) {
        const cartItems = JSON.parse(localStorage.getItem('cartProducts'));
        const result = await cart(cartItems).unwrap();
      }

      setItemCount(1);
    }
  };

  return (
    <Wrapper>
      {contextHolder}
      <div className="singleProduct">
        <div className="singleProduct__images">
          <div className="primary__image">
            <img src={products?.product_image} alt="" />
          </div>
          <div className="secondary__images">
            <div>
              <img src={products?.product_image} alt="" />
            </div>
            <div>
              <img src={products?.product_image} alt="" />
            </div>
            <div>
              <img src={products?.product_image} alt="" />
            </div>
            <div>
              <img src={products?.product_image} alt="" />
            </div>
          </div>
        </div>

        <div className="singleProduct__details">
          <div className="info">
            <h3 className="title">{products?.product_name}</h3>
            <p className="description">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consectetur consequatur molestiae exercitationem, magnam officiis
              recusandae, id delenii.
            </p>
          </div>

          <div className="product__rating">
            <Rating rating={products?.product_rating} />
            <p>{products?.noOfReview} reviews</p>
          </div>

          <div className="price">
            <h4>{`${PriceFormatter(products?.product_price)}`}</h4>
          </div>
          <div className="action">
            <div className="counters">
              <div className="count__action">
                <p onClick={decrease}>-</p>
                <p>{itemCount}</p>
                <p onClick={increase}>+</p>
              </div>
              <p className="total__items">Only 46 items left</p>
            </div>
            <div className="main__action">
              <button className="btn__buyNow">Buy Now</button>

              <button
                disabled={selectedProduct !== undefined && selectedProduct?.noOfProduct < selectedProduct?.itemsInStock || selectedProduct === undefined ? false : true}
                onClick={() => {
                  addToCartHandler(products);
                }}
                className="btn__addToCart"
              >
                Add to Cart
              </button>

            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .singleProduct {
    width: 80%;
    margin: 20px auto;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .singleProduct__images {
    width: 45%;
    display: flex;
    flex-direction: column;
  }

  .secondary__images {
    display: flex;
    margin-top: 20px;
    justify-content: space-between;
  }

  .secondary__images > * {
    width: 150px;
    height: 100px;
    background-color: #ececed;
  }

  .secondary__images > *:hover {
    border: 2px solid #013d2b;
  }

  .primary__image {
    width: 100%;
    height: 500px;
    background-color: #ececed;
  }

  .singleProduct__details {
    width: 45%;
    display: flex;
    flex-direction: column;
  }

  .singleProduct__details .info {
    margin-bottom: 20px;
  }

  .singleProduct__details .info .title {
    font-size: 2rem;
  }

  .singleProduct__details .price {
    margin: 30px 0;
    font-size: 2rem;
    border-top: 1px solid rgba(26, 24, 24, 0.1);
    border-bottom: 1px solid rgba(26, 24, 24, 0.1);
  }

  .singleProduct__details .price h4 {
    padding: 20px;
  }

  .singleProduct__details .action .main__action {
    display: flex;
  }

  .singleProduct__details .action > * {
    margin-bottom: 25px;
  }

  .singleProduct__details .action .main__action .btn__buyNow {
    padding: 15px 30px;
    width: 200px;
    background-color: #013d2b;
    margin-right: 20px;
    color: #fff;
    border-radius: 30px;
    cursor: pointer;
  }

  .singleProduct__details .action .main__action .btn__addToCart {
    padding: 15px 30px;
    width: 200px;
    background-color: #fff;
    margin-right: 20px;
    color: #013d2b;
    border-radius: 30px;
    border: 2px solid #013d2b;
    cursor: pointer;
  }

  .singleProduct__details .action .main__action .btn__addToCart:hover,
  .btn__remove__item__cart:hover {
    background-color: #185f4a;
    color: #fff;
  }

  .singleProduct__details .action .main__action .btn__buyNow:hover {
    background-color: #fff;
    border: 3px solid #013d2b;
    color: #013d2b;
  }

  .singleProduct__details .action .counters {
    display: flex;
  }

  .singleProduct__details .action .counters .count__action {
    background-color: #ececed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 3px solid #013d2b;
    border-radius: 30px;
    color: #013d2b;
    width: 150px;
    padding: 10px 30px;
    margin: 15px 20px 20px 0;
    cursor: pointer;
  }

  .singleProduct__details .action .counters p {
    display: flex;
    align-items: center;
    margin-top: 20px;
  }
  .singleProduct__details .action .counters .count__action p {
    display: flex;
    align-items: center;
    font-size: 1.5rem;

  }

  .singleProduct__images img {
    height: 100%;
    width: 100%;
    object-fit: contain;
    margin: 0 auto;
    text-align: center;
  }
`;
export default SingleProduct;
