const express = require('express');
const router = express.Router();
const statController = require('../controllers/statController');

router.get('/top-products', statController.topProducts)
router.get('/trending-products', statController.trendingProducts)

router.get('/top-suppliers', statController.topSuppliers)
router.get('/trending-suppliers', statController.trendingSuppliers)

router.get('/top-shops', statController.topShops)
router.get('/trending-shops', statController.trendingShops)

module.exports = router;
