const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
        categoryId: {type: mongoose.Schema.Types.ObjectId, required: true},
        name: {type: String, required: true},
        code: {type: String, required: true},
        price: {type: String, required: true},
    },
    {timestamps: true, collection: 'products'});

ProductSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

const Product = mongoose.model(
    "Product",
    ProductSchema,
    "products"
);

module.exports = Product;