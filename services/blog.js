let Model = require('../models/blog');

let add = (data, next) => {
    let d = new Model({
        name: data.name,
        description: data.description,
        image: data.image
    });

    if(data.hasOwnProperty("status")) d.status = data.status;

    d.save((err, category) => {
        if (err) {
            if (err.code === 11000) {
                return next(new Error("Blog Already Exist"));
            }
            next(err);
        } else {
            return next(null, category);
        }
    });
}

let update = (data, next) => {
    let d = {
        name: data.name,
        image: data.image,
        description: data.description,
        status: data.status || false
    }

    if(data.hasOwnProperty("status")) d.status = data.status;

    Model.findByIdAndUpdate(data.id, d, {new: true}, function (err, result) {
        if (err) {
            return next(err);
        } else {
            return next(null, result);
        }
    });
}

let load = (data, next) => {
    Model.find({status: true}, (err, result) => {
        if (err) {
            next(err);
        } else {
            next(null, result);
        }
    });
}

let loadAll = (data, next) => {
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
    load,
    loadAll
}