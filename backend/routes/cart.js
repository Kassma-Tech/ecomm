const { getCart, addCart, updateCart, removeFromCart } = require("../controller/cart");

const route = require("express").Router();

route.get("/cart", getCart);
route.post("/cart", addCart)
route.put("/cart/:id", updateCart)
route.delete("/cart/:id", removeFromCart)


module.exports = route;