const authorize = require("../controller/authorize.js");
const { getAllProducts, getSingleProduct, createProduct, deleteProduct, updateProduct } = require("../controller/product.js");

const route = require("express").Router();

route.get("/products", getAllProducts);
route.get("/product/:id", getSingleProduct)
route.post("/product", authorize, createProduct)
route.delete("/product/:id", authorize, deleteProduct)
route.patch("/product/:id", authorize, updateProduct)


module.exports = route;
