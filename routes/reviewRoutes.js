const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const reviewController = require('../controllers/reviewController');

router.get('/', authController.protect, reviewController.getAllReviews)
router.patch('/:id', authController.protect, reviewController.updateReview)
router.delete('/:id', authController.protect, reviewController.deleteReview)
router.get('/myreview', authController.protect, reviewController.getMyReview)

module.exports = router