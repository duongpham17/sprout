const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const ticketController = require('../controllers/ticketController');
const filter = require('../controllers/filterController');

router.get('/', authController.protect, ticketController.getAllTicket);
router.get('/length', authController.protect, ticketController.getUserTicketsLengthOnly);
router.get('/orders', authController.protect, ticketController.getUserTickets);
router.post('/create/:id', authController.protect, ticketController.createTicket);
router.patch('/update/:id', authController.protect, ticketController.updateTicket);
router.delete('/delete/:id', authController.protect, ticketController.deleteTicket);
router.patch('/payment/:id', authController.protect, ticketController.updatePaymentDetails);
router.patch('/trust/:id/:ticketId', authController.protect, ticketController.trustPoints);

router.patch('/time/:id', authController.protect, ticketController.updateTime);
router.get('/bin/buyer', authController.protect, ticketController.getBuyerTicketBin);
router.delete('/bin/buyer/:id', authController.protect, ticketController.deleteBuyerTicketBin);
router.get('/bin/seller', authController.protect, ticketController.getSellerTicketBin);
router.delete('/bin/seller/:id', authController.protect, ticketController.deleteSellerTicketBin);

router.get('/sellhistory', authController.protect, filter.History, ticketController.getSellerTicketHistory);
router.get('/buyhistory', authController.protect, filter.History, ticketController.getBuyerTicketHistory);
router.delete('/history/:id', authController.protect, ticketController.deleteSellerTicketHistory);
router.patch('/undohistory/:id', authController.protect, ticketController.undoSellerTicketHistory);

module.exports = router