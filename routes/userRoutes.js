const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const filter = require('../controllers/filterController');
const router = express.Router();

//users that are logged in
router.get('/', authController.protect, authController.LoggedIn)

//contact Me
router.post('/contact', userController.contactMeThroughEmail)

router.post('/signupseller', authController.signupSeller);
router.post('/signupbuyer', authController.signupBuyer);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.post('/forgotpassword', authController.forgotPassword)
router.patch('/resetpassword/:token', authController.resetPassword)

//me page
router.get('/data', authController.protect, userController.userData);
router.patch('/me', authController.protect, userController.updateMe);
router.patch('/password', authController.protect, authController.updatePassword);
router.patch('/email', authController.protect, authController.updateEmail);
router.put('/social', authController.protect, userController.addSocial);
router.delete('/social/:id', authController.protect, userController.deleteSocial);
//favourite
router.put('/favourite/:id', authController.protect, userController.favourite);
router.delete('/favourite/:id', authController.protect, userController.deleteFavourite);
//payment
router.patch('/payment', authController.protect, userController.paymentOptions);
//add business address and email
router.patch('/business', authController.protect, userController.updateBusinessAddressAndContacts);
//add Buyer addresses to checkout
router.put('/address', authController.protect, userController.addBuyerAddress);
router.delete('/address/:id', authController.protect, userController.deleteBuyerAddress);

//suggest
router.post('/suggest', authController.protect, userController.suggestion)
//report
router.post('/report/:id/:userId', authController.protect, userController.report)


module.exports = router;