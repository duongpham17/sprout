const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authController = require('../controllers/authController');
const filter = require('../controllers/filterController');

//Main home page
router.patch('/views/:id', productController.updateViews)
router.get('/userpost/:id', productController.getUserPost)

//Needed For One Product Page. || ticket || reviews ||
router.patch('/quantity/:id', authController.protect, productController.updateQuantity)
router.get('/one/:id', productController.getOneProduct)
router.get('/similar', filter.SortByViews, productController.getSimilarProducts)

//for category and filtering the query params 
router.get('/categorys', productController.getProducts)
router.get('/search/enter/:id', productController.searchBarForEnter)
router.get('/search/bar/description/:id', productController.searchBarForDescriptionTitle)

router.get('/mypost', authController.protect, productController.getMyPost)
router.get('/editproduct/:id', authController.protect, productController.getEditProduct)

//uploading images
router.put('/upload/images/:id', authController.protect, productController.uploadImages)
router.delete('/delete/images/:id/:image_id', authController.protect, productController.deleteImages)

router.delete('/delete/product/:id', authController.protect, productController.deleteProduct)
router.post('/create', authController.protect, productController.createProduct)
router.patch('/edit/:id', authController.protect, productController.updateProduct)
router.patch('/edit/des/:id', authController.protect, productController.updateProductDescription)
router.patch('/features/:id', authController.protect, productController.updateProductFeatures)
router.patch('/allergen/:id', authController.protect, productController.updateAllergens)
router.patch('/relist/:id', authController.protect, productController.updateListingDate)

router.get('/', productController.getProducts)

module.exports = router
