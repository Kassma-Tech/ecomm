const Order = require('../model/order');
const product = require('../model/product.js');
const cart = require('../model/cart');
const asyncHandler = require('express-async-handler');

const createOrder = async (req, res) => {
    const { PaymentResult, cartProducts, shippingInfo } = req.body.orderInfo;
    const { _id } = req.user;


    if (!PaymentResult || !cartProducts || !shippingInfo) res.sendStatus(404);

    let newCart = []
    cartProducts?.map(item => {
        newCart.push(
            item = {
                ...item,
                sellerId: item.user,
                product_id: item.product_id || item._id
            }
        )
    })

    console.log(newCart)

    if (PaymentResult.status === 'COMPLETED') {

        const result = await Order.insertMany({
            user: _id,
            product_info: newCart,
            shipping_Info: shippingInfo,
            payment: {
                payment_id: PaymentResult.id,
                first_name: PaymentResult?.payer?.name?.given_name,
                last_name: PaymentResult?.payer?.name?.surname,
                amount: PaymentResult?.purchase_units[0]?.amount?.value,
                currency: PaymentResult?.purchase_units[0]?.amount?.currency_code,
                payer_email: PaymentResult?.payer?.email_address,
                status: PaymentResult.status,
                create_time: PaymentResult.create_time,
                country_code: PaymentResult?.payer?.address?.country_code,
            }
        })

        await cart.deleteMany();
        newCart?.map(async item => {
            const result = await product.findById(item.product_id);
            if (result) {
                const itemsInStk = result.itemsInStock;
                await product.updateOne({ _id: item.product_id }, { $set: { itemsInStock: itemsInStk - item.noOfProduct } })
            }
        })

        const Res = {
            order: result[0].product_info,
            totalPrice: result[0].payment.amount
        }

        res.status(200).json(Res)
    }
}

const getOrder = async (req, res) => {
    const { _id: id } = req.user;

    try {
        const result = await Order.find({ user: id }).select('product_info');
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json(error?.message)
    }
}

const getAllOrder = asyncHandler(async (req, res) => {
    const { _id: loggedInId, role } = req.user;

    if (role === "admin") {
        const result = await Order.find({}).select('product_info');
        const newRes = [];
        result.map(order => {
            let tempData = {
                orderId: order._id
            }
            order?.product_info.map(product => {
                tempData = {
                    ...tempData,
                    productId: product?.product_id,
                    noOfProduct: product?.noOfProduct,
                    product_name: product?.product_name,
                    product_price: product?.product_price,
                    totalItemPrice: product?.totalItemPrice,
                    shippingStatus: product?.shipping_status
                }
            })
            newRes.push(tempData)
        })
        return res.status(200).json(newRes)
    }
    else if (role === 'seller') {
        const result = await Order.find({ product_info: { $elemMatch: { sellerId: loggedInId } } }).select('product_info');
        console.log(result)

        const newRes = [];
        result.map(order => {
            let tempData = {
                orderId: order._id
            }
            order?.product_info.map(product => {
                tempData = {
                    ...tempData,
                    productId: product?.product_id,
                    noOfProduct: product?.noOfProduct,
                    product_name: product?.product_name,
                    product_price: product?.product_price,
                    totalItemPrice: product?.totalItemPrice,
                    shippingStatus: product?.shipping_status
                }
            })
            newRes.push(tempData)
        })
        return res.status(200).json(newRes)
    }

    res.status(401).json({ message: 'Unauthorized user' })
})

const updateShippingStatus = asyncHandler(async (req, res) => {
    const { shippingStatus, productId } = req.body;
    const { _id: loggedInUser } = req.user;
    const { orderId } = req.params;

    console.log(req.body)

    const shippingStatusValues = {
        pending: "pending",
        outfordelivery: "outfordelivery",
        readyfordispatch: "readyfordispatch",
        delivered: "delivered",
        cancelled: 'cancelled'
    }


    const isShippingStatusExist = Object.keys(shippingStatusValues).includes(shippingStatus);

    if (!isShippingStatusExist) return res.status(400).json({ message: "Shipping status is not valid" });

    const order = await Order.findOne({ _id: orderId, product_info: { $elemMatch: { sellerId: loggedInUser, product_id: productId } } },).select('product_info')

    if (!order) return res.status(400).json({ message: "Order not exist" });

    const updated = await Order.updateOne({
        _id: orderId, product_info:
        {
            $elemMatch:
                { sellerId: loggedInUser, product_id: productId }
        }
    },
        { $set: { 'product_info.$.shipping_status': shippingStatus } }
    )

    //user
    //buy now
    //update shipping - frontend

    if (!updated) return res.status(400).json({ message: "Something went wrong" })
    return res.status(202).json({ message: "updated successfully" })
})

module.exports = {
    createOrder,
    getOrder,
    getAllOrder,
    updateShippingStatus
}