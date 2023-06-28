const Order = require('../model/order');
const product = require('../model/product.js');
const cart = require('../model/cart');

const createOrder = async (req, res) => {
    const { PaymentResult, cartProducts, shippingInfo } = req.body.orderInfo;
    const { _id } = req.user;


    if (!PaymentResult || !cartProducts || !shippingInfo) res.sendStatus(404);

    let newCart = []
    cartProducts?.map(item => {
        newCart.push(
            item = {
                ...item,
                product_id: item.product_id || item._id
            }
        )

    })

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
            // console.log("Hellllllllllllllllllllllo")
            const { itemsInStock: itemsInStk } = await product.findById(item.product_id);
            const res = await product.updateOne({ _id: item.product_id }, { $set: { itemsInStock: itemsInStk - item.noOfProduct } })
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
        const result = await Order.find({ user: id });
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json(error?.message)
    }
}


module.exports = {
    createOrder,
    getOrder
}