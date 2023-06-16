const cart = require("../model/cart");
const Cart = require("../model/cart")
const asyncHandler = require('express-async-handler')

const getCart = asyncHandler(async (req, res) => {
    const { _id: id } = req.user;

    if (!id) return res.sendStatus(401);

    const cartItems = await Cart.find({ user: id });

    if (cartItems.length < 1) return res.status(404).json({ message: "No item found" })
    res.status(200).json({ data: cartItems })
})

const addCart = asyncHandler(async (req, res) => {
    const { product_name, product_image, product_price, product_rating, totalItemPrice, noOfReview, itemInStock, noOfProduct } = req.body;
    const user = req.user;

    const cart = new Cart({
        product_name: product_name,
        product_image,
        product_price,
        product_rating,
        totalItemPrice,
        noOfReview,
        itemInStock,
        noOfProduct,
        user: user._id
    })
    const result = await Cart.create(cart)
    console.log(result)

    if (!result) return res.sendStatus(400)
    res.status(200).json({ data: result })
})


const updateCart = (async (req, res) => {
    const id = req.params.id;
    const { totalItemPrice, noOfProduct } = req.body;

    console.log(id)
    const result = await Cart.updateOne({ _id: id }, { noOfProduct, totalItemPrice })

    if (!result) return res.status(204).json({ message: "Not data to be updated" });
    res.status(200).json({ message: result })
})

const removeFromCart = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const result = await Cart.deleteOne({ _id: id });

    if (!result) return res.status(204).json({ message: "Cannot deleted" });
    res.status(200).json({ message: result })
})

module.exports = {
    getCart,
    addCart,
    updateCart,
    removeFromCart
}