const User = require('../models/userModel');
const Suggest = require('../models/suggestModel');
const Report = require('../models/reportModel');
const appError = require('../utilies/appError');
const catchAsync = require('../utilies/catchAsync');
const {contactMe} = require('../utilies/email');

//use this in any function that need to return the same data in react. E.g for delete and patch, For instant updates without reloading.
const _populate = async (req) => {
    const data = await User.findById(req)
    .select(['-password'])
    .populate({path: 'favourite.product', select:['price', '_id', 'description_title', 'image']})

    return data
}

//Load user Data on browser opening.
exports.userData = catchAsync(async(req, res, next) => {

    const user = await _populate(req.user.id)
    const role = user.role

    if(!user){
        return next (new appError("Please Login Again.", 400))
    }

    res.status(200).json({
        status:"success",
        role,
        user
    })
})

//update user 
exports.updateMe = catchAsync(async(req, res, next) => {
    
    const user = await User.findByIdAndUpdate(req.user.id, req.body, {
        new: true,
    });

    if(!user){
        return next( new appError('No user with that id. Please log in again.', 401))
    }

    res.status(200).json({
        status: 'success',
        user
    })
})

//add social
exports.addSocial = catchAsync(async(req, res, next) => {
   //deconstruct the req.body.
   const {app} = req.body
   const soc = {app}

   //find the user id by the req.params.id
   const user = await User.findById(req.user.id)

   //one display social for front page, so if the array is longer than 1 then, return error.
   if(user.social.length === 10){
       return next( new appError('Maximum 10 social apps ', 400))
   }

   //add socials to the array 
   user.social.unshift(soc)

   //save user social 
   await user.save()

   //return user data
   res.status(200).json({
       length: user.social.length,
       status: 'success',
       user
   })
})

//delete social
exports.deleteSocial = catchAsync(async(req, res, next) => {
    //find the user id by the req.params.id
    const user = await User.findById(req.user.id)
    
    //find image array
    user.social.find(el => el.id === req.params.id)

    //one display social for front page, so if the array is longer than 1 then, return error.
    if(!user){
        return next( new appError('No user found.', 400))
    }
 
    const index = user.social.indexOf(user.social.find(el => el.id === req.params.id))

    user.social.splice(index, 1)
 
    await user.save()
 
    //return user data
    res.status(200).json({
        length: user.social.length,
        status: 'success',
        user
    })
})

//favourite a product
exports.favourite = catchAsync(async(req, res, next) => {
    //first find the user that is logged on.
    const userFav = await User.findById(req.user.id)

    //second check if the logged in user has favourited the product via its id.
    if(userFav.favourite.filter(el => el.product.toString() === req.params.id).length > 0){
        return next( new appError("This product has already been favourited.", 400))
    }

    //third everything okay. add product id to the favourite array at first index.
    userFav.favourite.unshift({product: req.params.id})

    //then save the userFav.
    await userFav.save()

    const user = await _populate(req.user.id)

    //return user data.
    res.status(200).json({
       status: "success",
       user
   })
})

//favourite delete
exports.deleteFavourite = catchAsync(async(req, res, next) => {
    //find user and populate the product id. for react 
    const userFav = await User.findById(req.user.id).select('-password')

    //if no userFav
    if(!userFav){
        return next( new appError("No favourites", 400))
    }

    const index = userFav.favourite.indexOf(userFav.favourite.find(del => del.id === req.params.id))

    userFav.favourite.splice(index, 1)

    await userFav.save()

    const user = await _populate(req.user.id)

    res.status(200).json({
        status: 'success',
        user
    })
})


//add payment options
exports.paymentOptions = catchAsync(async(req, res, next) => {

    const { 
        cash,

        /* Visa */
        bank, first, last, sortcode, accountnumber,

        /* paypal */
        email,

        /* Cryptos */
        bitcoin, cardano, litecoin, dash, vechain

    } = req.body

    const pay = await User.findByIdAndUpdate(req.user.id, 
    {
    cash, 
    visa:{bank, first, last, sortcode, accountnumber},
    paypal:{email}, 
    bitcoin, cardano, litecoin, dash, vechain
    }
    , 
    {new:true})

    if(!pay){
        return next(new appError("Connection issue please login.", 400))
    }

    const user = await _populate(req.user.id)

    res.status(201).json({
        status: 'success',
        user
    })
})

//add business address and contact email
exports.updateBusinessAddressAndContacts = catchAsync(async(req, res, next) => {

    const {show, contactEmail, phone, address, address2, city, postcode } = req.body

    const business = await User.findByIdAndUpdate(req.user.id, { business:{show, contactEmail, phone, address, address2, city, postcode} }, {new:true})

    if(!business){
        return next( new appError("Connection issue please login.", 400))
    }

    const user = await _populate(req.user.id)

    res.status(201).json({
        status: 'success',
        user
    })
})

//add buyers addresses to checkout so they can quickly checkout
exports.addBuyerAddress = catchAsync(async(req, res, next) => {

    const {title, address, address2, city, postcode} = req.body

    const buyerAddress = await User.findById(req.user.id)

    if(buyerAddress.addresses.length >= 10){
        return next (new appError("Max 10 Addresses.", 400))
    }

    //third everything okay. add product id to the favourite array at first index.
    buyerAddress.addresses.unshift({title, address, address2, city, postcode})

    //then save the user.
    await buyerAddress.save()

    const user = await _populate(req.user.id)

    res.status(200).json({
        status: "success",
        user
    })
})

//add buyers addresses to checkout so they can quickly checkout
exports.deleteBuyerAddress = catchAsync(async(req, res, next) => {

    const buyerAddress = await User.findById(req.user.id)

    if(!buyerAddress){
        return next (new appError("Please Check Your Internet", 400))
    }

    const index = buyerAddress.addresses.indexOf(buyerAddress.addresses.find(del => del.id === req.params.id))

    buyerAddress.addresses.splice(index, 1)

    //then save the user.
    await buyerAddress.save()

    const user = await _populate(req.user.id)

    res.status(200).json({
        status: "success",
        user
    })
})


//suggestion
exports.suggestion = catchAsync(async(req, res, next) => {

    const suggest = await Suggest.create({
        user: req.user.id,
        message: req.body.message,
    })

    if(!suggest){
        return next(new appError("Error sending. Try again later.", 400))
    }

    res.status(200).json({
        status: "success",
    })
})

//report products
exports.report = catchAsync(async(req, res, next) => {

    const report = await Report.create({
        product: req.params.id,
        shop: req.params.userId,
        user: req.user.id
    })

    if(!report){
        return next("Shop has been reported already. Thank You.", 400)
    }

    res.status(200).json({
        status: "success",
    })
})

//let user send email to get in contact
exports.contactMeThroughEmail = catchAsync(async(req, res, next) => {
    try{
        await contactMe({
            email: req.body.email,
            subject: req.body.subject,
            message: req.body.message
        });

        res.status(200).json({
            status: "success",
            message: 'Email Sent To Sprout. Please give us 3-4 workings days to reply.'
        })
    } catch (err){
        return next(new appError("There was an error sending the email. Try again later!", 500))
    }
});
