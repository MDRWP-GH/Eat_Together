const express = require('express');
const router = express.Router();
const { create, list, remove } = require('../controllers/category');

router.post('/category', create) // get all categories
router.get('/category', list) // get all categories
router.delete('/category/:id', remove) // delete category

module.exports = router; // export the router