const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const category_admin_controller = require('../controllers/category.admin.controller');

// a simple test url to check that all of our files are communicating correctly.
router.get('/test', category_admin_controller.test);
router.post('/create', category_admin_controller.category_create);
router.get('/load/:id', category_admin_controller.category_details);
router.put('/update/:id', category_admin_controller.category_update);
router.delete('/delete/:id', category_admin_controller.category_delete);
router.get('/count', category_admin_controller.total_categories);
router.get('/loadall', category_admin_controller.load_categories);
module.exports = router;