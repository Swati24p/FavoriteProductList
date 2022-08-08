const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const productSchema = new mongoose.Schema ({

    userId: {
        type: ObjectId,
        required: true,
        ref: 'user',
        trim: true
    },
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    isFavorite: {
        type: Boolean,
        default: false
    },
    price: {
        type: Number,
        required: true
    },
    deletedAt: {
        type: Date
    },
    isDeleted: {
        type: Boolean,
        default: false
    }

}, { timestamps: true });

module.exports = mongoose.model('product', productSchema);