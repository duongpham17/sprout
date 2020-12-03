const Product = require('../models/productModel');
const Review = require('../models/reviewModel')
const appError = require('../utilies/appError');
const catchAsync = require('../utilies/catchAsync');
const Features = require('../utilies/features');

//get all reviews
exports.getAllReviews = catchAsync(async(req, res, next) => {
    const review = await Review.find()

    if(!review){
        return next( new appError("Review does not exist", 400))
    }

    res.status(200).json({
        length: review.length,
        status: "success",
        review
    })
})

//just do react
exports.getProductReviews = catchAsync(async(req, res, next) => {
    const product = new Features(Review.find({product: req.params.id}), req.query).pagination().sort()
    const review = await product.query.populate("user", ['name', 'avatar'])

    if(!review){
        return next (new appError("Product does not exist", 400))
    }

    res.status(200).json({
        status: "success",
        review
    })
})

//create reviews to instantly show review in react
exports.createProductReview = catchAsync(async(req, res, next) => {

    const createReview = await Review.create({
        user: req.user.id,
        product: req.params.id,
        review :req.body.review,
        rating: req.body.rating,
    })

    if(!createReview){
        return next(new appError("Can only be Reviewed once", 400))
    }

    const product = new Features(Review.find({product: req.params.id}), req.query).pagination().sort()
    const review = await product.query.populate("user", ['name', 'avatar'])
    
    res.status(200).json({
        status: "success",
        review
    })
})

//Get all documents that have the user id that is currently logged in. Then we populate the id to show name and email...
exports.getMyReview = catchAsync(async(req, res, next) => {
    const findlength = await Review.find({user: req.user.id})
    const length = findlength.length
    
    //first we find the logged in user and sort it from newest first.
    const rev = new Features(Review.find({user: req.user.id}), req.query).pagination().sort()
    const review = await rev.query.populate('product', ['image'])

    //if no product then return an error
    if(!review) {
        return next(new appError('No product created by this user', 400))
    }

    //if all good, then return length of product created and the product documents data.
    res.status(200).json({
        status: 'success',
        length,
        review
    })
})

//Delete Review
exports.deleteReview = catchAsync(async(req, res, next) => {
    const findlength = await Review.find({user: req.user.id})
    const length = findlength.length

    const reviewDel = await Review.findByIdAndDelete(req.params.id)

    if(!reviewDel){
        return next( new appError("Review does not exist", 401))
    }

    const rev = new Features(Review.find({user: req.user.id}), req.query).pagination().sort()
    const review = await rev.query.populate('product', ['image'])

    res.status(200).json({
        status: "susccess",
        length,
        review
    })
})


//update review
exports.updateReview = catchAsync(async(req, res, next) => {
    const findlength = await Review.find({user: req.user.id})
    const length = findlength.length

    const reviewed = await Review.findByIdAndUpdate(req.params.id, {review: req.body.review}, {
        new: true
    })

    if(!reviewed){
        return next( new appError("Review does not exist", 401))
    }

    const rev = new Features(Review.find({user: req.user.id}), req.query).pagination().sort()
    const review = await rev.query.populate('product', ['image'])


    res.status(200).json({
        status: "susccess",
        length,
        review
    })
})





