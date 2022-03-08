const mongoose = require("mongoose");
let ObjectId = mongoose.Schema.Types.ObjectId;

const CategorySchema = new mongoose.Schema({
        id: {type: ObjectId},
        parentCategoryId: {type: ObjectId},
        name: {type: String, required: true, max: 100},
        description: {type: String, required: true},
    },
    {timestamps: true, collection: 'categories'});

CategorySchema.virtual('id').get(function () {
    return this._id.toHexString();
});

const Category = mongoose.model(
    "Category",
    CategorySchema,
    "categories"
);

module.exports = Category;