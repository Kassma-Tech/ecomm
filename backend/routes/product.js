const { getAllProducts, getSingleProduct } = require("../controller/product.js");

const route = require("express").Router();

route.get("/products", getAllProducts);
route.get("/product/:id",getSingleProduct)


module.exports = route;
