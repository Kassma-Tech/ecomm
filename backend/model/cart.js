const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    product_name: { type: String, require: true },
    product_image: { type: String, require: true },
    product_price: { type: Number, require: true },
    product_rating: { type: Number, default: 0 },
    totalItemPrice: { type: Number, default: 0 },
    noOfReview: { type: Number, default: 0 },
    itemsInStock: { type: Number, default: 0 },
    noOfProduct: { type: Number, default: 0 },
    sellerId: { type: String, require: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

}, { timestamps: true })

module.exports = mongoose.model("Cart", cartSchema);