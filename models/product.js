const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    category: {type: Schema.Types.ObjectId, ref: "Category", required: true},
    name: {type: String, required: true},
    shortDescription: {type: String},
    description: {type: String},
    images: {type: Array},
    price: {type: Number, min: 0, default: 0},
    tax: {type: Number, min: 0, default: 0},
    discount: {type: Number, min: 0, default: 0},
    size: {type: String},
    status: {
        type: Boolean,
        default: false
    },
}, {toJSON: { virtuals: true }, toObject: {virtuals: true}, timestamps: true, collection: 'products'});

ProductSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

ProductSchema.pre(/^find/, function(next) {
    this.populate({
        path: "category",
        select: " _id name",
    });
    next()
});

module.exports = mongoose.model('Product', ProductSchema, "products");