const { getCart, addCart, updateCart, removeFromCart } = require("../controller/cart");

const route = require("express").Router();

route.get("/", getCart);
route.post("/", addCart)
route.put("/:id", updateCart)
route.delete("/:id", removeFromCart)


module.exports = route;