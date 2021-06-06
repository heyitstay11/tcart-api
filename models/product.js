const mongoose = require('mongoose');
const { nanoid } = require('nanoid');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true,
        default: () => nanoid(5),
    },
    imgLink: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    }
});

module.exports = mongoose.model('product', productSchema);