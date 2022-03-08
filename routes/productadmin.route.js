const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const product_admin_controller = require('../controllers/product_admin.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', product_admin_controller.test);
router.post('/create', product_admin_controller.product_create);
router.get('/:id', product_admin_controller.product_details);
router.put('/:id/update', product_admin_controller.product_update);
router.delete('/:id/delete', product_admin_controller.product_delete);
module.exports = router;