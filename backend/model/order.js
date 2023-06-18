import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    product_id: [
        { type: String }
    ],
    shipping_Info: {
        first_name: { type: String, required: true },
        last_name: { type: String },
        email: { type: String, required: true },
        street: { type: String, required: true },
        city: { type: String, required: true },
        postal_code: { type: Number, required: true },
        country: { type: String, required: true },
        merchant_id: { type: String, required: true },
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