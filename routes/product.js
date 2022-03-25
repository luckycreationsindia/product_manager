const express = require('express');
const router = express.Router();
const Controller = require('../controllers/product');

/* Add New Product */
router.post('/add', Controller.add);

/* Update Product */
router.post('/update', Controller.update);

/* Load All Products */
router.get('/', Controller.loadAll);

/* Load Products */
router.post('/', Controller.load);

module.exports = router;
