const Category = require('../model/category');

exports.test = function (req, res, next) {
    res.send('Greetings from the Test Category Admin controller!');
};

exports.category_create = function (req, res, next) {
    let result = {status : "Failure", message : "Error Processing your Request"};
    let category = new Category(
        {
            parentCategoryId: req.body.parentCategoryId,
            name: req.body.name,
            description: req.body.description,
        }
    );

    category.save(function (err) {
        if (err) {
            result.message = 'Error';
            return res.json(result);
        }
        result.status = 'Success';
        result.message = 'Created Successfully';
        return res.json(result);
    })
};

exports.category_update = function (req, res, next) {
    let result = {status : "Failure", message : "Error Processing your Request"};
    Category.findOneAndUpdate(req.params.id, {$set: req.body}, function (err, category) {
        if (err) {
            result.message = 'Error';
            return res.json(result);
        }
        result.status = 'Success';
        result.message = 'Updated Successfully';
        return res.json(result);
    });
};

exports.category_delete = function (req, res, next) {
    let result = {status : "Failure", message : "Error Processing your Request"};
    Category.findOneAndDelete(req.params.id, function (err) {
        if (err) {
            result.message = 'Error';
            return res.json(result);
        }
        result.status = 'Success';
        result.message = 'Deleted Successfully';
        return res.json(result);
    })
};

exports.total_categories = function (req, res, next) {
    let result = {status : "Failure", message : "Error Processing your Request"};
    Category.countDocuments({}, function (err, count) {
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

exports.load_categories = function (req, res, next) {
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
    Category.paginate({}, options, function(err, categoriesresult) {
        if (err) {
            result.message = 'Error';
            return res.json(result);
        }
        result.status = 'Success';
        result.message = 'Success';
        result.data = categoriesresult;
        return res.json(result);
    });
};

exports.category_details = function (req, res, next) {
    let result = {status : "Failure", message : "Error Processing your Request"};
    Category.findById(req.params.id, function (err, category) {
        if (err) {
            result.message = 'Error';
            return res.json(result);
        }
        result.status = 'Success';
        result.message = 'Success';
        result.data = category;
        return res.json(result);
    })
};