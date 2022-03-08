const Product = require('../model/product');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test Product controller!');
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