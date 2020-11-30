const appError = require('../utilies/appError');
const catchAsync = require('../utilies/catchAsync');

const Product = require('../models/productModel');
const Follow = require('../models/followModel');
const User = require('../models/userModel');
const Review = require('../models/reviewModel');
const Ticket = require('../models/ticketModel');
const Suggest = require('../models/suggestModel');
const Report = require('../models/reportModel');

//Select option
const selectOpt = ['role', 'email', 'bad', 'good', 'reported']

//get user information with Email
exports.getUserWithEmail = catchAsync(async(req, res, next) => {

    const user = await User.findOne({email: req.params.id})
    .select(selectOpt)

    if(!user){
        return next (new appError("User does not exist", 400))
    }

    res.status(200).json({
        status: "success",
        user,
    })
})

//get user information with ID
exports.getUserWithId = catchAsync(async(req, res, next) => {

    const user = await User.findById(req.params.id)
    .select(selectOpt)

    if(!user){
        return next (new appError("User does not exist", 400))
    }

    res.status(200).json({
        status: "success",
        user
    })
})

//update user information
exports.updateUser = catchAsync(async(req, res, next) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .select(selectOpt)

    if(!user){
        return next (new appError("User does not exist", 400))
    }

    res.status(200).json({
        status: "success",
        user
    })
})


//get product information with product ID
exports.getProductWithId = catchAsync(async(req, res, next) => {

    const product = await Product.findById(req.params.id)
    .populate({path: 'reviews', options:{sort:{'createdAt': -1}}}).select(['createdAt', 'view', 'ratingsAverage', 'ratingsQuantity', 'reported', 'description_title', 'image'])

    if(!product){
        return next (new appError("Product Does not exist", 400))
    }

    res.status(200).json({
        status: "success",
        product
    })
})

//delete product reviews 
exports.deleteProductReviews = catchAsync(async(req, res, next) => {

    const review = await Review.findByIdAndDelete(req.params.id)

    if(!review){
        return next (new appError("Review no longer exist", 400))
    }

    const product = await Product.findById(req.params.productId)
    .populate({path: 'reviews', options:{sort:{'createdAt': -1}}}).select(['createdAt', 'view', 'ratingsAverage', 'ratingsQuantity', 'reported', 'description_title', 'image'])

    res.status(200).json({
        status: "success",
        product
    })
})

//get reported products thats above a certain reported number
exports.getReportedProducts = catchAsync(async(req, res, next) => {
    const num = req.query.report

    const product = await Product.find({reported: {$gte: num}}).sort({reported: -1}).select(['reported', 'createdAt', 'user'])

    if(!product){
        return next("Shop has been reported already. Thank You.", 400)
    }

    res.status(200).json({
        status: "success",
        product
    })
})

//delete all reported documents relating to the shop
exports.deleteProductReports = catchAsync(async(req, res, next) => {
    const report = await Report.deleteMany({"product": req.params.id})

    if(!report){
        return next (new appError("No more reported documents", 400))
    }

    const product = await Product.findById(req.params.id)
    .populate({path: 'reviews', options:{sort:{'createdAt': -1}}}).select(['createdAt', 'view', 'ratingsAverage', 'ratingsQuantity', 'reported', 'description_title', 'image'])

    res.status(200).json({
        status: "success",
        product
    })
})

//delete product and all its corresponding reviews from the database.
exports.deleteProduct = catchAsync(async(req, res, next) => {
    //find product
    const product = await Product.findById(req.params.id)

    if(!product){
        return next( new appError('Product has been delete or does not exist', 400))
    }

    await Report.deleteMany({"product": req.params.id})

    await Review.deleteMany({"product": req.params.id})

    product.delete(req.params.id)

    res.status(200).json({
        status: "success",
        product
    })
})

//get users products 
exports.getUserProducts = catchAsync(async(req, res, next) => {
    const product = await Product.find({user: req.params.id})

    if(!product){
        return next (new appError("User does not exist", 400))
    }

    res.status(200).json({
        status: "success",
        product
    })
})

//delete anything the user id is within.
exports.deleteUser = catchAsync(async(req, res, next) => {
    await Product.deleteMany({"user": req.params.id})

    await Review.deleteMany({"user": req.params.id})

    await Ticket.deleteMany({"seller": req.params.id})

    await Ticket.deleteMany({"buyer": req.params.id})

    await Follow.deleteMany({"current_user" : req.params.id})

    await Follow.deleteMany({"follow_user" : req.params.id})

    await Report.deleteMany({"shop": req.params.id})

    await Suggest.deleteMany({"user": req.params.id})

    await User.findByIdAndDelete(req.params.id)

    res.status(200).json({
        status: "success",
    })
})

//create users with role
exports.createUsers = catchAsync(async(req, res, next) => {
    await User.create({
        role : req.body.role,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })

    res.status(200).json({
        status: "success",
    })
})

//delete anything the user id is within.
exports.getAllUsers = catchAsync(async(req, res, next) => {
    const user = await User.find().select(['id'])
    const admin = await User.find({role: "admin"}).select(['id'])

    res.status(200).json({
        status: "success",
        admin: admin.length,
        user: user.length,
    })
})

//find ticket
exports.getTicketWithId = catchAsync(async(req, res, next) => {
    const ticket = await Ticket.findById(req.params.id)

    if(!ticket){
        return next (new appError("Ticket does not exist", 400))
    }

    res.status(200).json({
        status: "success",
        ticket
    })

})

//update ticket
exports.updateTicket = catchAsync(async(req, res, next) => {
    const findTicket = await Ticket.findById(req.params.id)

    if(!findTicket){
        return next (new appError("Ticket does not exist", 400))
    }

    const {amount} =req.body
    //first, add the amount entered 
    const updateDate = amount + Date.parse(findTicket.deleteDate)
    //second, convert it back to unix
    const convertedTime = new Date(updateDate)
    //thrid, add convertedTime to req.body.
    const ticket = await Ticket.findByIdAndUpdate(req.params.id, {deleteDate: convertedTime}, {new: true})

    res.status(200).json({
        status: "success",
        ticket
    })
})


//get suggestions
exports.getSuggestion = catchAsync(async(req, res, next) => {

    const page = parseInt(req.query.page)

    const suggest = await Suggest.find().sort({createdAt: -1}).limit(page).populate('user', ['name'])

    if(!suggest){
        return next(new appError("Something went wrong", 400))
    }

    res.status(200).json({
        status: "success",
        suggest
    })
})

//delete all suggestion inside the collection
exports.cleanSuggestion = catchAsync(async(req, res, next) => {
    await Suggest.deleteMany({delId: 1})

    const suggest = await Suggest.find()

    res.status(200).json({
        status: "success",
        suggest
    })
})


