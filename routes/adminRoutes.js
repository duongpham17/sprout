const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authController = require('../controllers/authController');

router.get('/ticket/:id', authController.protect, adminController.getTicketWithId)
router.patch('/ticket/:id', authController.protect, adminController.updateTicket)

router.get('/user-id/:id', authController.protect, adminController.getUserWithId)
router.get('/user-email/:id', authController.protect, adminController.getUserWithEmail)
router.patch('/user/:id', authController.protect, adminController.updateUser)

router.get('/user-products/:id', authController.protect, adminController.getUserProducts)
router.delete('/delete-user/:id', authController.protect, adminController.deleteUser)

router.get('/product-id/:id', authController.protect, adminController.getProductWithId)
router.delete('/delete-product/:id', authController.protect, adminController.deleteProduct)
router.delete('/delete-reviews/:id/:productId', authController.protect, adminController.deleteProductReviews)

router.get('/users', authController.protect, adminController.getAllUsers)
router.post('/users', authController.protect, adminController.createUsers)

router.get('/suggest', authController.protect, adminController.getSuggestion)
router.delete('/suggest', authController.protect, adminController.cleanSuggestion)

router.get('/reports', authController.protect, adminController.getReportedProducts)
router.delete('/reports/:id', authController.protect, adminController.deleteProductReports)

module.exports = router;