const Order = require('../model/order');
const product = require('../model/product');
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

        // console.log(typeof (newCart))
        // console.log(newCart)
        // if (typeof newCart === 'array')
        newCart?.map(async item => {
            const { itemsInStock: itemsInStk } = await product.findById(item.product_id);
            const res = await product.updateOne({ _id: item.product_id }, { $set: { itemsInStock: itemsInStk - item.noOfProduct } })
        })


        res.status(200).json(result)
    }
}

const test = async (req, res) => {
    // console.log(req.body)
    const { _id } = req.user;

    console.log(_id)
    res.send(req.body)
}


module.exports = {
    createOrder
}