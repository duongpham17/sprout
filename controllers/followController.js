const User = require('../models/userModel');
const Product = require('../models/productModel');
const Follow = require('../models/followModel');
const {catchAsync, appError} = require('../util/CatchError');
const Feature = require('../util/features');

//get all follows 
exports.getAllFollows = catchAsync(async(req, res, next) => {
    const follow = await Follow.find()

    if(!follow){
        return next (new appError("Pleaes Reload Page OR Check Internet.", 400))
    }

    res.status(200).json({
        length: follow.length,
        status: "success",
        follow
    })
})

//getting users followings and followers
exports.getUserForFollow = catchAsync(async(req, res, next) => {
    const follow = await User.findById(req.user.id)
    .select(['followingNum', 'followerNum', 'followings', 'followers'])
    .populate({ path: 'followings', populate:{path: "follow_user", select:['avatar', 'shop']} })
    .populate({ path: 'followers', select:['-follow_user'] })

    if(!follow){
        return next (new appError('No user', 400))
    } 

    res.status(200).json({
        status: "success",
        follow
    })
})

//follow 
exports.follow = catchAsync(async(req, res, next) => {

    const _follow = await Follow.create(
    {
        current_user: req.user.id, 
        follow_user: req.params.id
    })

    if(!_follow){
        return next(new appError("Cant follow the same shop", 400))
    }

    const follow = await User.findById(req.user.id)
    .select(['followings', 'followingNum', 'followerNum'])
    .populate({ path: 'followings', populate:{path: "follow_user", select:['avatar', 'shop']} })

    res.status(200).json({
        status: "success",
        follow
    })
})

//unfollow
exports.unFollow = catchAsync(async(req, res, next) => {
    const unfollow = await Follow.findByIdAndDelete(req.params.id)

    if(!unfollow){
        return next (new appError('Already unfollowed', 400))
    }

    const follow = await User.findById(req.user.id).select(['followings', 'followingNum', 'followerNum'])
    .populate({ path: 'followings', populate:{path: "follow_user", select:['avatar', 'shop']} })

    res.status(200).json({
        status: "success",
        follow
    })
})


//Search Bar for Shop Name
exports.searchBarForShop = catchAsync(async(req, res, next) => {

    //for input, inputting one letter would return.
    const follow = await User.find({"shop": {$regex: req.params.id}})
    .limit(10)
    .select(['shop', 'avatar'])

    if(!follow){
        return next(new appError("No result", 400))
    }

    //send the product
    res.status(201).json({
        length: follow.length,
        status: 'success',
        follow
    });
})

exports.followingUsersLatestPost = catchAsync(async(req, res, next) => {
    //1) first find the logged in user, select only followings field and populate followings field.
    let user = await User.findById(req.user.id).select('followings').populate('followings')

    if(!user){
        return next( new appError("User does not exist.", 401))
    }

    //2) second make sure to have an empty array to store all the following ids
    let array = []

    //3) third now we need to push the following ids into the empty array which i called "const array = []"
    //We use {"users" : el.user.id} you can give "users" any name. This will then be stored inside the empty array as [users: "343f3432432r3204..."]
    await user.followings.map(el => array.push({users: el.follow_user})) 

    //4) We now need to find the product id based on the users ids we stored inside the empty array.
    const usersProduct = new Feature(Product.find({user: array.map(el => el.users)}), req.query).sort().pagination()

    const follow = await usersProduct.query.populate('user', ['name', 'shop', 'avatar', 'good', 'bad']).exec()

    res.status(200).json({
        length: follow.length,
        status: "success",
        follow
    })
})
