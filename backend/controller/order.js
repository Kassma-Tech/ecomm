

const createOrder = async (req, res) => {
    const { PaymentResult, cartProducts, shippingInfo } = req.body;
    const { _id } = req.user;

    if (!PaymentResult || !cartProducts || !shippingInfo) res.sendStatus(404);

    if (PaymentResult.status === 'COMPLETED') {

    }
}

const test = async (req, res) => {
    // console.log(req.body)
    const { _id } = req.user;

    console.log(_id)
    res.send(req.body)
}


module.exports = {
    test
}