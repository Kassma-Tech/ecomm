const mongoose = require('mongoose');


const productSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: 'userModel'
        },
        product_name: {
            type: String,
            required: true
        },
        product_image: {
            type: String,
            required: true
        },
        product_description: {
            type: String,
        },
        product_price: {
            type: Number,
            required: true
        },
        product_rating: {
            type: Number,
            default: 0,
        },
        noOfReview: {
            type: Number,
            default: 0,
        },
        noOfProduct: {
            type: Number,
            default: 0,
        },
        itemsInStock: {
            type: Number,
            require: true
        }
    }, {
    timestamps: true
}
)
module.exports = mongoose.model("Product", productSchema);