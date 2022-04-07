const express = require('express');
const router = express.Router();
const Controller = require('../controllers/product');
const middlewares = require('../middlewares');

/* Add New Product */
router.post('/add', middlewares.adminCheck, Controller.add);

/* Update Product */
router.post('/update', middlewares.adminCheck, Controller.update);

/* Load All Products */
router.get('/', middlewares.adminCheck, Controller.loadAll);

/* Load All Products */
router.post('/loadAll', middlewares.adminCheck, Controller.loadAll);

/* Load Products */
router.post('/', Controller.load);

module.exports = router;
