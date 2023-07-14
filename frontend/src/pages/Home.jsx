/* Dependencies */
import React, { useEffect, useState } from "react";
import Product from "../components/product";
import Banner from "../components/Banner";
import styled from "styled-components";
import { useGetAllProductsQuery } from "../endpoints/productApiSlice";
import Filter from "../components/Filter";

function Home() {

  const { data: products } = useGetAllProductsQuery();
  return (
    <>
      <Banner />
      {/* <Filter /> */}
      <Wrapper className="container-fluid py-5">
        <div className="row">
          {products?.map((product) => (
            <Product product={product} key={product._id} />
          ))}
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
