const mongoose = require('mongoose');

const deleteRecordSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    role: { type: String, require: true },
}, {
    timestamps: true
})
module.exports = mongoose.model('DeleteRecord', deleteRecordSchema);