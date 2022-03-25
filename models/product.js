const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    category: {type: Schema.Types.ObjectId, ref: "categories", required: true},
    name: {type: String, required: true},
    description: {type: String},
    price: {type: Number, min: 0, default: 0},
    tax: {type: Number, min: 0, default: 0},
    discount: {type: Number, min: 0, default: 0},
    status: {
        type: Boolean,
        default: false
    },
}, {timestamps: true, collection: 'products'});

ProductSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

module.exports = mongoose.model('Product', ProductSchema, "products");