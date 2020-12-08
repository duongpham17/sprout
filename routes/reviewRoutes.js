const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const reviewController = require('../controllers/reviewController');

router.get('/', authController.protect, reviewController.getAllReviews)
router.get('/product/:id', authController.protect, reviewController.getProductReviews)
router.post('/product/:id', authController.protect, reviewController.createProductReview)
router.get('/my', authController.protect, reviewController.getMyReview)
router.patch('/:id', authController.protect, reviewController.updateReview)
router.delete('/:id', authController.protect, reviewController.deleteReview)

module.exports = router