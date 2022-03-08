const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const category_controller = require('../controllers/category.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', category_controller.test);
router.get('/count', category_controller.total_categories);
router.get('/loadall', category_controller.load_categories);
router.get('/load/:id', category_controller.category_details);
module.exports = router;