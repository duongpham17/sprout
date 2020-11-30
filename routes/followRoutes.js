const express = require('express');
const authController = require('../controllers/authController');
const followController = require('../controllers/followController');
const filter = require('../controllers/filterController');
const router = express.Router();

//follow
router.post('/:id', authController.protect, followController.follow);
router.delete('/un/:id', authController.protect, followController.unFollow)
router.get('/', authController.protect, followController.getAllFollows);
router.get('/shops/:id', authController.protect, followController.searchBarForShop)
router.get('/latest', authController.protect, filter.Following, followController.followingUsersLatestPost);
router.get('/user', authController.protect, followController.getUserForFollow)

module.exports = router;