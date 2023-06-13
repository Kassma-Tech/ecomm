/* Dependencies */
import React, { useEffect, useState } from "react";
import Product from "../components/product";
import Banner from "../components/Banner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { fetchProducts } from "../features/productSlice";
import { useGetAllProductsQuery } from "../endpoints/productApiSlice";

function Home() {
  const dispatch = useDispatch();
  // const { products, error } = useSelector((state) => state.product);

  const { data: products } = useGetAllProductsQuery();


  return (
    <>
      <Banner />
      <Wrapper>
        {/* <Filters /> */}
        <div className="products">
          <h2 className="product__title">Headphone for you</h2>
          <div className="product__container">
            {products?.map((product) => (
              <div key={product._id}>
                <Product product={product} />
              </div>
            ))}
          </div>
        </div>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  width: 80%;
  margin: 0 auto;

  .product__container {
    display: flex;
    flex-wrap: wrap;
  }

  .product__img {
    width: 150px;
    height: 150px;
  }

  .products,
  .filters__container {
    width: 100%;
  }

  .product,
  .product__title {
    margin-right: 25px;
    font-size: 0.9rem;
  }
`;
export default Home;
