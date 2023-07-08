const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    product_info: [
        {
            product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            noOfProduct: { type: Number },
            product_name: { type: String, },
            product_image: { type: String, },
            product_rating: { type: Number, },
            product_price: { type: Number },
            totalItemPrice: { type: Number },
            shipping_status: { type: String, default: 'pending' },
            sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
        }
    ],

    shipping_Info: {
        first_name: { type: String, required: true },
        last_name: { type: String },
        email: { type: String, required: true },
        street: { type: String, required: true },
        city: { type: String, required: true },
        postal_code: { type: Number, required: true },
        country: { type: String, required: true },
    },

    payment: {
        payment_id: { type: String, required: true },
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
        amount: { type: Number, required: true },
        currency: { type: String, required: true },
        payer_email: { type: String, required: true },
        status: { type: String, required: true },
        create_time: { type: String },
        country_code: { type: String }
    }
})
module.exports = mongoose.model("Order", orderSchema);