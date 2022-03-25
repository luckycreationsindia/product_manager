const express = require('express');
const router = express.Router();
const Controller = require('../controllers/category');
const middlewares = require('../middlewares');

/* Add New Category */
router.post('/add', middlewares.adminCheck, Controller.add);

/* Update Category */
router.post('/update', middlewares.adminCheck, Controller.update);

/* Load All Categories */
router.get('/', Controller.loadAll);

/* Load Categories */
router.post('/', Controller.load);

module.exports = router;
