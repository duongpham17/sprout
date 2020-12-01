const Product = require('../models/productModel');
const User = require('../models/userModel');
const catchAsync = require('../utilies/catchAsync');

const selectForProduct = () => ['view', 'image', 'user', 'price', 'quantity', 'description_title', 'ratingsAverage', 'ratingsQuantity', 'description_title', 'createdAt', 'delivery', 'collect', 'supplier', 'est_delivery', 'cost_delivery']
const selectForUser = (...x) => ['shop', 'avatar', 'good', 'followingNum', ...x]
const populateWithUser = {path: 'user', select:['shop', 'good', 'bad']}
const statisticFilter = (model, query, limit, sort, select, pop) => model.find(query).limit(parseInt(limit)).sort(sort).select(select).populate(pop)

// Top Products based on, views, ratingsAverage, ratingsQuantity
exports.topProducts = catchAsync(async(req, res, next) => {

    const product = await statisticFilter(Product, {supplier: "no", region: req.query.region}, req.query.limit, req.query.sort, selectForProduct(), populateWithUser)

    res.status(200).json({
        status: "success",
        product
    })
})

//Trending Products based on, views and date created ranging from 1day, 1week, 1month etc..
exports.trendingProducts = catchAsync(async(req, res, next) => {
    const date = (x) => new Date(Date.now() - (x * 24 * 60 * 60 * 1000))

    const product = await statisticFilter(Product, {supplier: "no", region: req.query.region, createdAt: {$gte: date(req.query.days)}}, req.query.limit, req.query.sort, selectForProduct(), populateWithUser)

    res.status(200).json({
        status: "success",
        product
    })
})

//Top Supplier based on, views, ratingsAverage, ratingsQuantity
exports.topSuppliers = catchAsync(async(req, res, next) => {

    const product = await statisticFilter(Product, {supplier: 'yes', region: req.query.region}, req.query.limit, req.query.sort, selectForProduct(), populateWithUser)

    res.status(200).json({
        status: "success",
        product
    })
})

//Top
exports.trendingSuppliers = catchAsync(async(req, res, next) => {
    const date = (x) => new Date(Date.now() - (x * 24 * 60 * 60 * 1000))

    const product = await statisticFilter(Product, {supplier: 'yes', region: req.query.region, createdAt: {$gte: date(req.query.days)}}, req.query.limit, req.query.sort, selectForProduct(), populateWithUser)

    res.status(200).json({
        status: "success",
        product
    })
})

exports.topShops = catchAsync(async(req, res, next) => {

    const user = await statisticFilter(User, {region: req.query.region}, req.query.limit, req.query.sort, selectForUser())

    res.status(200).json({
        status: "success",
        user
    })
})

exports.trendingShops = catchAsync(async(req, res, next) => {
    const date = (x) => new Date(Date.now() - (x * 24 * 60 * 60 * 1000))

    const user = await statisticFilter(Product, {region: req.query.region, createdAt: {$gte: date(req.params.days)}}, req.query.limit, req.query.sort, selectForUser())
    res.status(200).json({
        status: "success",
        user
    })
})

