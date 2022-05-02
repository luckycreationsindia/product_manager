let Model = require('../models/product');

let add = (data, next) => {
    let product = new Model({
        category: data.category,
        name: data.name,
        description: data.description || "",
        size: data.size,
        status: data.status || false,
        price: data.price || 0,
        tax: data.tax || 0,
        discount: data.discount || 0
    });

    if (data.hasOwnProperty("description")) product.description = data.description;
    if (data.hasOwnProperty("images")) product.images = data.images;
    if (data.hasOwnProperty("status")) product.status = data.status;
    if (data.hasOwnProperty("price")) product.price = data.price;
    if (data.hasOwnProperty("tax")) product.tax = data.tax;
    if (data.hasOwnProperty("discount")) product.discount = data.discount;

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
    }

    if (data.hasOwnProperty("name")) product.name = data.name;
    if (data.hasOwnProperty("description")) product.description = data.description;
    if (data.hasOwnProperty("images")) product.images = data.images;
    if (data.hasOwnProperty("status")) product.status = data.status;
    if (data.hasOwnProperty("price")) product.price = data.price;
    if (data.hasOwnProperty("tax")) product.tax = data.tax;
    if (data.hasOwnProperty("discount")) product.discount = data.discount;
    if (data.hasOwnProperty("size")) product.size = data.size;

    Model.findByIdAndUpdate(data.id, product, {new: true}, function (err, result) {
        if (err) {
            return next(err);
        } else {
            return next(null, result);
        }
    });
}

let load = (data, next) => {
    let filter = {status: true};
    let limit = 10;
    let skip = 0;
    if (data && data.hasOwnProperty('cid') && data.cid) {
        filter['category'] = data.cid;
    }
    if (data && data.hasOwnProperty('page') && data.page) {
        skip = parseInt(data.page);
        skip > 0 ? skip -= 1 : skip;
    }
    Model.find(filter, {}, {limit: limit, skip: limit * skip}, (err, result) => {
        if (err) {
            next(err);
        } else {
            next(null, result);
        }
    });
}

let loadSingle = (data, next) => {
    let filter = {_id: data.id};
    if(!data.isAdmin) {
        filter.status = true;
    }
    Model.findOne(filter, (err, result) => {
        if (err) {
            next(err);
        } else {
            next(null, result);
        }
    });
}

let loadAll = (data, next) => {
    let filter = {};
    if (data && data.hasOwnProperty('cid')) {
        filter['category'] = data.cid;
    }
    if (data && data.hasOwnProperty('id')) {
        filter['_id'] = data.id;
    }
    Model.find(filter, (err, result) => {
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
    load,
    loadAll,
    loadSingle
}