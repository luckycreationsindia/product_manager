const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    name: {type: String, required: true, unique: true},
    description: {type: String},
    image: {type: String},
    status: {
        type: Boolean,
        default: false
    },
}, {timestamps: true, collection: 'blogs'});

BlogSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

module.exports = mongoose.model('Blog', BlogSchema, "blogs");