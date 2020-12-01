const Product = require('../models/productModel');
const Review = require('../models/reviewModel');
const Report = require('../models/reportModel');
const appError = require('../utilies/appError');
const catchAsync = require('../utilies/catchAsync');
const Feature = require('../utilies/features');


/* related to Ticket, E.g when ticket is created it will minus the quantity based on the amount entered  */
//update quantity for product, based on the amount of quantity is selected
exports.updateQuantity = catchAsync(async(req, res, next) => {
    const product = await Product.findByIdAndUpdate(req.params.id, {quantity: req.body.quantity}, {new: true})
    .populate('user', ['name', 'shop', 'social', 'good', 'bad', 'business', 'paypal', 'visa', 'bitcoin', 'cardano', 'cash'])
    .populate({path: 'reviews', options:{sort:{'createdAt': -1}}, populate: {path: 'user', select:['name', 'avatar']} })

    if(product.quantity <= 0){
        return next(new appError("Product has no stock left", 400))
    }

    res.status(200).json({
        status: 'success',
        product
    })
})

//create reviews to instantly show review in react
exports.createReview = catchAsync(async(req, res, next) => {

    const review = await Review.create({
        user: req.user.id,
        product: req.params.id,
        review :req.body.review,
        rating: req.body.rating,
    })

    if(!review){
        return next(new appError("Can only be Reviewed once", 400))
    }

    const product = await Product.findById(req.params.id)
    .populate('user', ['name', 'shop', 'social', 'good', 'bad', 'business', 'paypal', 'visa', 'bitcoin', 'cardano', 'cash'])
    .populate({path: 'reviews', options:{sort:{'createdAt': -1}}, populate: {path: 'user', select:['name', 'avatar']} })
    
    res.status(200).json({
        status: "success",
        product
    })
})


//get similar products no bias
exports.getProducts = catchAsync(async(req, res, next) => {

    const prod = new Feature(Product.find(), req.query).pagination().sort().filter()

    if(!prod){
        return next(new appError("This product does not exist", 400))
    }

    const product = await prod.query.select([ 'view', 'ratingsAverage', 'ratingsQuantity', 'image', 'delivery', 'collect', 'est_delivery', 'cost_delivery', 
    'createdAt', 'user', 'price', 'quantity', 'description_title', 'type', 'region']).populate({path: 'user', select:['shop', 'good', 'bad', 'name']})

    res.status(200).json({
        status: "success",
        product
    })
})

// get product by id // populate with user // populate with virtual reviews options to sort by date created
exports.getOneProduct = catchAsync(async(req, res, next) => {

    const product = await Product.findById(req.params.id)
    .populate('user', ['name', 'shop', 'social', 'good', 'bad', 'business', 'paypal', 'visa', 'bitcoin', 'cardano', 'cash'])
    .populate({path: 'reviews', options:{sort:{'createdAt': -1}}, populate: {path: 'user', select:['name', 'avatar']} })

    if(!product){
        return next(new appError("This product no longer exist.", 400))
    }
    
    //send the product
    res.status(201).json({
    status: 'success',
    product
    })
})


//get similar products no bias
exports.getSimilarProducts = catchAsync(async(req, res, next) => {
    const date = (x) => new Date(Date.now() - (x * 24 * 60 * 60 * 1000))

    const prod = new Feature(Product.find({createdAt: {$gte: date(60)}}), req.query).pagination().sort().filter()

    if(!prod){
        return next(new appError("This product does not exist", 400))
    }

    const product = await prod.query.select(['price', 'view', 'description_title', 'image'])

    res.status(200).json({
        status: "success",
        product
    })
})

//for search bar
exports.searchBarForDescriptionTitle = catchAsync(async(req, res, next) => {

    //for input, inputting one letter would return.
    const title = await Product.find({"description_title": {$regex: req.params.id}}).limit(10).select("description_title")

    if(!title){
        return next(new appError("No result", 400))
    }

    //Use this to filter out duplicate types inside the array. So if there is 2 cake only cake will return
    function getUnique(arr, index) {
        const unique = arr
             .map(e => e[index])
             // store the keys of the unique objects
             .map((e, i, final) => final.indexOf(e) === i && i)
             // Get rid of duplicate keys & store unique objects
            .filter(e => arr[e]).map(e => arr[e]);      
        return unique;
    }

    const unique = getUnique(title, "description_title")

    const product = unique.filter(el => {return el.description_title})

    //send the product
    res.status(201).json({
        length: product.length,
        status: 'success',
        product
    });
})

//for search bar. When users click enter without filling the enter description detials in.
exports.searchBarForEnter = catchAsync(async(req, res, next) => {

    //for input, inputting one letter would return.
    const prod = new Feature(Product.find({"description_title": {$regex: req.params.id}}), req.query).pagination().sort().filter()

    const product = await prod.query.select([
        'view', 'ratingsAverage', 'ratingsQuantity', 'image', 'delivery', 'collect', 'est_delivery', 'cost_delivery', 
        'createdAt', 'user', 'price', 'quantity', 'description_title', 'type', 'region'
    ]).populate({path: 'user', select:['shop', 'good', 'bad', 'name']})

    if(!product){
        return next(new appError("No result for this product", 400))
    }

    //send the product
    res.status(201).json({
        length: product.length,
        status: 'success',
        product
    });
})

//creating a product with the current user that is logged on.
exports.createProduct = catchAsync(async(req, res, next) => {
    //deconstruct req.body.price in to just price .etc
    const {
        price, quantity, description_title,
        category, region, type
    } = req.body

    //create the product using .create, whatever is put inside the body will be inside document.
    const product = await Product.create({
        user: req.user.id,
        price, quantity, description_title,
        category, region, type
        }
    );
    
    //check the creation phase, if the product was made
    if(!product){
        return next(new appError('No user found with a product.', 400))
    }

    //send the product
    res.status(201).json({
        status: 'success',
        product
    })
})

exports.getEditProduct = catchAsync(async(req, res, next) => {
    const product = await Product.findById(req.params.id).select(['-view', '-ratingsAverage', '-ratingsQuantity', '-__v'])

    if(!product){
        return next( new appError("This product does not exist", 400))
    }

    res.status(200).json({
        status: "success",
        product
    })
})


//update a product by its id through a req.params.id
exports.updateProduct = catchAsync(async(req, res, next) => {
    
    //deconstruct req.body.price in to just price .etc
    const {
        supplier, price, quantity, description_title, contacts, minimumQuantity,
        phone, category, type, social, region, descriptionOne, return_policy
    } = req.body

    //update the product based on the fields we pass into the req.body
    const product = await Product.findByIdAndUpdate(req.params.id, 
        {
            supplier, price, quantity, contacts,
            minimumQuantity, phone, category, type, social, region,
            description_title, descriptionOne, return_policy
        }
        ,
        { new: true }).select(['-view', '-ratingsAverage', '-ratingsQuantity', '-__v'])
    
    //check if the product exist, if not then return an error
    if(!product) {
        return next(new appError("Can't find Product", 401))
    }

    //if everything is good return the update product
    res.status(201).json({
        status: 'success',
        product
    })
})

//update a product by its id through a req.params.id
exports.updateProductDescription = catchAsync(async(req, res, next) => {
    
    //deconstruct req.body.price in to just price .etc
    const {
        des_1, title_1,
        des_2, title_2,
        des_3, title_3,
        
    } = req.body

    //update the product based on the fields we pass into the req.body
    const product = await Product.findByIdAndUpdate(req.params.id, 
        {   
            description: {
                description_one:{des: des_1, title: title_1}, 
                description_two:{des: des_2, title: title_2},
                description_three:{des: des_3, title: title_3} 
            }
        }
        ,
        { new: true }).select(['-view', '-ratingsAverage', '-ratingsQuantity', '-__v'])
    
    //check if the product exist, if not then return an error
    if(!product) {
        return next(new appError("Can't find Product", 401))
    }

    //if everything is good return the update product
    res.status(201).json({
        status: 'success',
        product
    })
})

//update products
exports.updateProductFeatures = catchAsync(async(req, res, next) => {
    //update the product based on the fields we pass into the req.body
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true});

    if(!product){
        return next( new appError('No product with this id exist. Please try another.', 401))
    }

    res.status(200).json({
        status: 'success',
        product
    })
})

exports.updateAllergens = catchAsync(async(req, res, next) => {

    const {nuts, fish, celery, crustaceans, milk, 
        mustard, peanuts, soya, wheat, eggs, 
        lupin, mollus, sesame, sulphur
    } = req.body

    const product = await Product.findByIdAndUpdate(req.params.id, 
    {allergens:{
        nuts, fish, celery, crustaceans, milk, 
        mustard, peanuts, soya, wheat, eggs, 
        lupin, mollus, sesame, sulphur} 
    }
    , {new: true})

    res.status(200).json({
        status: "success",
        product
    })
})


//update the created at date for the product listed.
exports.updateListingDate= catchAsync(async(req, res, next) => {
    //simply update what is put inside the req.body
    const productTime = await Product.findById(req.params.id)

    if(!productTime){
        return next(new appError('This product does not exist anymore', 400))
    }

    //increase relisting date by 12 days
    const reDate = Date.parse(productTime.relistDate) + (14 * 24 * 60 * 60 * 1000)
    const RelistConvertedTime = new Date(reDate)

    //incrase createdAt date also by 12 days
    const crDate = Date.parse(productTime.createdAt) + (14 * 24 * 60 * 60 * 1000)
    const CreateConvertedTime = new Date(crDate)

    const product = await Product.findByIdAndUpdate(req.params.id, {relistDate: RelistConvertedTime, createdAt: CreateConvertedTime}, {
        new: true
    })

    res.status(201).json({
        status: 'success',
        product
    })
})

//update views 
exports.updateViews = catchAsync(async(req, res, next) => {
    
    const product = await Product.findByIdAndUpdate(req.params.id, {view: req.body.view}, {
        new: true,
    });

    if(!product){
        return next( new appError('No user with that id. Please log in again.', 401))
    }

    res.status(200).json({
        status: 'success',
        product
    })
})

//Get all documents that have the user id that is currently logged in.
exports.getUserPost = catchAsync(async(req, res, next) => {
    const lengthOfProduct = await Product.find({user: req.params.id})

    //first we find the logged in user and sort it from newest first.
    const prod = new Feature(Product.find({user: req.params.id}), req.query).sort().pagination()

    //populate the user ObjectId inside Product document with the users information.
    const product = await prod.query
    .select([
    'view', 'ratingsAverage', 'ratingsQuantity', 'image', 'createdAt', 'user', 'price', 'quantity', 'description_title', 'delivery', 'collect', 'cost_delivery', 'est_delivery'
    ])
    .populate({path: "user", select:['shop', 'good', 'bad'] })

    //if no product then return an error
    if(!product) {
        return next(new appError('No product created by this user', 400))
    }

    //if all good, then return length of product created and the product documents data.
    res.status(200).json({
        status: 'success',
        length: lengthOfProduct.length,
        product
    })
})


//Get all documents that have the user id that is currently logged in.
exports.getMyPost = catchAsync(async(req, res, next) => {
    const lengthOfProduct = await Product.find({user: req.user.id})

    //first we find the logged in user and sort it from newest first.
    const prod = new Feature(Product.find({user: req.user.id}), req.query).sort().pagination()

    //populate the user ObjectId inside Product document with the users information.
    const product = await prod.query.select(['supplier', 'view', 'ratingsAverage', 'ratingsQuantity', 'relistDate', 'price', 'quantity', 'description_title', 'category', 'type', 'region', 'image', 'createdAt'])

    //if no product then return an error
    if(!product) {
        return next(new appError('No product created by this user', 400))
    }

    //if all good, then return length of product created and the product documents data.
    res.status(200).json({
        status: 'success',
        length: lengthOfProduct.length,
        product
    })
})

//update the created at date for the product listed.
exports.updateListingDateForMyProduct= catchAsync(async(req, res, next) => {
    //simply update what is put inside the req.body
    const productTime = await Product.findById(req.params.id)

    if(!productTime){
        return next(new appError('This product does not exist anymore', 400))
    }

    //increase relisting date by 12 days
    const reDate = Date.parse(productTime.relistDate) + (14 * 24 * 60 * 60 * 1000)
    const RelistConvertedTime = new Date(reDate)

    //incrase createdAt date also by 12 days
    const crDate = Date.parse(productTime.createdAt) + (14 * 24 * 60 * 60 * 1000)
    const CreateConvertedTime = new Date(crDate)

    await Product.findByIdAndUpdate(req.params.id, {relistDate: RelistConvertedTime, createdAt: CreateConvertedTime}, {
        new: true
    })

    const prod = new Feature(Product.find({user: req.user.id}), req.query).sort().pagination()
    //populate the user ObjectId inside Product document with the users information.
    const product = await prod.query.select(['view', 'ratingsAverage', 'ratingsQuantity', 'relistDate', 'price', 'quantity', 'description_title', 'category', 'type', 'region', 'image', 'createdAt'])

    res.status(201).json({
        status: 'success',
        product
    })
})

//upload images
exports.uploadImages = catchAsync(async(req, res, next) => {
    const product = await Product.findById(req.params.id)

    if(product.image.length === 7){
        return next( new appError('You have exceeded the limit of image uploads', 400))
    }

    product.image.push({url: req.body.url})

    await product.save()

    res.status(200).json({
        status: 'success',
        product
    })
})

//delete images
exports.deleteImages = catchAsync(async(req, res, next) => {
    //find product
    let product = await Product.findById(req.params.id)

    //find image array
    product.image.find(img => img.id === req.params.image_id)

    if(!product){
        return next(new appError('Product does not exist', 400))
    }

    const index = product.image.indexOf(product.image.find(img => img.id === req.params.image_id))

    product.image.splice(index, 1)

    await product.save();

    res.status(200).json({
        status: 'success',
        product
    })
})

//delete product and all its corresponding reviews from the database.
exports.deleteProduct = catchAsync(async(req, res, next) => {
    //find product
    const product = await Product.findById(req.params.id)
    //Making sure the image array length has been deleted
    if(product.image.length !== 0){
        return next( new appError('Please delete all images first. To Confirm.', 400))
    }

    await Report.deleteMany({"product" : req.params.id})

    await Review.deleteMany({"product": req.params.id})

    product.delete(req.params.id)

    res.status(200).json({
        status: "success",
    })
})

