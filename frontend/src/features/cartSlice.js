import { createSlice, current } from "@reduxjs/toolkit";
import { json } from "react-router-dom";
import BASE_URL from "../URL/url";
import { useSelector } from "react-redux";



const initialState = {
  cartProducts: JSON.parse(localStorage.getItem("cartProducts")) || [],
  totalItemPrice: 0,
  totalPrice: 0,
  shippingInfo: JSON.parse(localStorage.getItem("shippingInfo")) || {},
  quantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: {
      reducer: (state, action) => {
        const previousItem = state.cartProducts.findIndex(
          (item) => item._id == action.payload.product._id
        );
        if (previousItem < 0) {
          state.cartProducts.push({

            ...action.payload.product,
            noOfProduct: action.payload.itemCount,

            totalItemPrice:
              action.payload.itemCount * action.payload.product.product_price,
          });
        } else {
          state.cartProducts[previousItem] = {
            ...state.cartProducts[previousItem],

            noOfProduct: (state.cartProducts[previousItem].noOfProduct +=
              action.payload.itemCount),

            totalItemPrice: (state.cartProducts[previousItem].totalItemPrice +=
              state.cartProducts[previousItem].product_price *
              action.payload.itemCount),
          };
        }

        let tempTotalPrice = 0;
        let tempQuantity = 0;

        state.cartProducts?.map((item) => {
          tempTotalPrice += item.totalItemPrice;
          tempQuantity += item.noOfProduct;
        });

        state.totalPrice = tempTotalPrice;
        state.quantity = tempQuantity;

        localStorage.setItem("cartProducts", JSON.stringify(state.cartProducts));
      },
      prepare({ product, itemCount }) {
        return { payload: { product, itemCount } };
      },
    },
    removeFromCart: (state, action) => {
      const filteredCart = state.cartProducts?.filter(item => item._id !== action.payload);
      state.cartProducts = filteredCart
      localStorage.setItem("cartProducts", JSON.stringify(state.cartProducts));
    },
    setCart: (state, action) => {
      state.cartProducts = action.payload.cartItems;
    },
    updateCartQuantity: (state, action) => {
      state.cartProducts?.map(item => {

        if (item._id === action.payload.id) {
          item.noOfProduct = Number(action.payload.value);

          item.totalItemPrice = item.noOfProduct * item.product_price
          localStorage.setItem("cartProducts", JSON.stringify(state.cartProducts));
          return
        }
      })
    },
    addShippingInfo: (state, action) => {
      state.shippingInfo = action.payload
      localStorage.setItem("shippingInfo", JSON.stringify(state.shippingInfo))
    }
  },
});


export const { addToCart, cartTotalPrice, removeFromCart, setCart, updateCartQuantity, addShippingInfo } = cartSlice.actions;
export default cartSlice.reducer;
