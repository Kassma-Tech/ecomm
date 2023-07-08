const cart = require("../model/cart");
const Cart = require("../model/cart")
const asyncHandler = require('express-async-handler')

const getCart = asyncHandler(async (req, res) => {
    const { _id: id } = req.user;

    console.log("Hello")
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
            user: user._id,
            sellerId: item.user
        })
    })
    res.status(200).json({ ...req.body.orderInfo, user: user.id })
})

const updateCarts = asyncHandler(async (req, res) => {
    const user = req.user;

    const existingCart = await Cart.find({ user: user._id });
    const newCart = req.body
    let tempCart = req.body;


    newCart?.map((item, index) => {
        existingCart.map(async i => {
            if (item._id == i.product_id) {
                tempCart[index] = ""

                await Cart.updateOne({ product_id: item._id }, {
                    noOfProduct: item.noOfProduct + i.noOfProduct,
                    totalItemPrice: item.totalItemPrice + i.totalItemPrice
                })
            }
        })
    })

    const uniqueCart = tempCart.filter(item => item != "");

    uniqueCart.length > 0 && uniqueCart?.map(async item => {
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
    res.send("finished")

})


const updateQuantity = (async (req, res) => {
    // const id = req.params.id;
    // const { totalItemPrice, noOfProduct } = req.body;

    console.log(req.body)
    // console.log(id)
    // const result = await Cart.updateOne({ _id: id }, { noOfProduct, totalItemPrice })

    // if (!result) return res.status(204).json({ message: "Not data to be updated" });
    // res.status(200).json({ message: result })
})

const removeFromCart = asyncHandler(async (req, res) => {

    const id = req.params.id;
    console.log(id)
    const result = await Cart.deleteOne({ _id: id });

    if (!result) return res.status(204).json({ message: "Cannot deleted" });
    res.status(200).json({ message: result })
})

module.exports = {
    getCart,
    addCart,
    updateCarts,
    updateQuantity,
    removeFromCart
}