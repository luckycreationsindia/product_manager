let Model = require('../models/product');

let add = (data, next) => {
    let product = new Model({
        category: data.category,
        name: data.name,
        description: data.description || "",
        status: data.status || false,
        price: data.price || 0,
        tax: data.tax || 0,
        discount: data.discount || 0
    });

    product.save((err, result) => {
        if (err) {
            if (err.code === 11000) {
                return next(new Error("Product Already Exist"));
            }
            next(err);
        } else {
            return next(null, result);
        }
    });
}

let update = (data, next) => {
    let product = {
        category: data.category,
        name: data.name,
        description: data.description || "",
        status: data.status || false,
        price: data.price || 0,
        tax: data.tax || 0,
        discount: data.discount || 0
    }

    Model.findByIdAndUpdate(data.id, product, {new: true}, function (err, result) {
        if (err) {
            return next(err);
        } else {
            return next(null, result);
        }
    });
}

let load = (data, next) => {
    Model.find({}, (err, result) => {
        if (err) {
            next(err);
        } else {
            next(null, result);
        }
    });
}

module.exports = {
    add,
    update,
    load
}