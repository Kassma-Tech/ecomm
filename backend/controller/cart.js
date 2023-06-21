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
    const user = req.user;
    await Cart.deleteMany({ user: user._id })

    req.body?.orderInfo?.map(async item => {
        await Cart.insertMany({
            product_id: item._id,
            product_name: item.product_name,
            product_image: item.product_image,
            product_price: item.product_price,
            product_rating: item.product_rating,
            totalItemPrice: item.totalItemPrice,
            noOfReview: item.noOfReview,
            itemsInStock: item.itemsInStock,
            noOfProduct: item.noOfProduct,
            user: user._id
        })
    })

    res.status(200).json({ ...req.body.orderInfo, user: user.id })
})

const Test = async (res, req) => {
    const user = req.user;

    const { product_id, product_image, product_name, product_price, product_rating, noOfProduct, noOfReview } = req.body;


}

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