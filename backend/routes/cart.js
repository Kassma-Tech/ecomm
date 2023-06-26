const { getCart, addCart, updateCarts, removeFromCart, updateQuantity } = require("../controller/cart");

const route = require("express").Router();

route.get("/", getCart);
route.post("/", addCart)
route.put("/updatecart", updateCarts)
route.patch("/updateqty/:id", updateQuantity)
route.delete("/:id", removeFromCart)


module.exports = route;