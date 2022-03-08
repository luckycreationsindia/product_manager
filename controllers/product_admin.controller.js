const Product = require('../model/product');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test Product Admin controller!');
};

exports.product_create = function (req, res, next) {
    let result = {status : "Failure", message : "Error Processing your Request"};
    let product = new Product(
        {
            categoryId: req.body.categoryId,
            name: req.body.name,
            code: req.body.code,
            price: req.body.price
        }
    );

    product.save(function (err) {
        if (err) {
            result.message = 'Error';
            return res.json(result);
        }
        result.status = 'Success';
        result.message = 'Created Successfully';
        return res.json(result);
    })
};

exports.product_update = function (req, res) {
    let result = {status : "Failure", message : "Error Processing your Request"};
    Product.findOneAndUpdate(req.params.id, {$set: req.body}, function (err, product) {
        if (err) {
            result.message = 'Error';
            return res.json(result);
        }
        result.status = 'Success';
        result.message = 'Updated Successfully';
        return res.json(result);
    });
};

exports.product_delete = function (req, res) {
    let result = {status : "Failure", message : "Error Processing your Request"};
    Product.findOneAndDelete(req.params.id, function (err) {
        if (err) {
            result.message = 'Error';
            return res.json(result);
        }
        result.status = 'Success';
        result.message = 'Deleted Successfully';
        return res.json(result);
    })
};

exports.total_products = function (req, res, next) {
    let result = {status : "Failure", message : "Error Processing your Request"};
    Product.countDocuments({}, function (err, count) {
        if (err) {
            result.message = 'Error';
            return res.json(result);
        }
        result.status = 'Success';
        result.message = 'Success';
        result.count = count;
        return res.json(result);
    });
};

exports.load_products = function (req, res, next) {
    let result = {status : "Failure", message : "Error Processing your Request"};
    let myCustomLabels = {
        totalDocs: 'count',
        docs: 'data',
        limit: 'perPage',
        page: 'currentPage',
        nextPage: 'next',
        prevPage: 'prev',
        totalPages: 'pageCount'
    };
    let options = {customLabels: myCustomLabels};
    if(req.query.page && req.query.limit) {
        options.page = parseInt(req.query.page);
        options.limit = parseInt(req.query.limit);
    }
    Product.paginate({}, options, function(err, productsresult) {
        if (err) {
            result.message = 'Error';
            return res.json(result);
        }
        result.status = 'Success';
        result.message = 'Success';
        result.data = productsresult;
        return res.json(result);
    });
};

exports.product_details = function (req, res) {
    let result = {status : "Failure", message : "Error Processing your Request"};
    Product.findById(req.params.id, function (err, product) {
        if (err) {
            result.message = 'Error';
            return res.json(result);
        }
        result.status = 'Success';
        result.message = 'Success';
        result.data = product;
        return res.json(result);
    })
};