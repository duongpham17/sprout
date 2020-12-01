const User = require('../models/userModel');
const appError = require('../utilies/appError');
const catchAsync = require('../utilies/catchAsync');
const jwt = require('jsonwebtoken');
const {promisify} = require('util');
const {sendForgotPasswordEmail}= require('../utilies/email');
const crypto = require('crypto')

//creating token for user id
const signToken = id => {
    return jwt.sign({id}, process.env.JWT_SECRET, 
        {expiresIn: process.env.JWT_EXPIRES}
    )
};

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    const cookieOptions = {
        expires: new Date( Date.now() + process.env.JWT_EXPIRES_NUM * 24 * 60 * 60 * 1000),
        httpOnly: process.env.NODE_ENV === "production" ? true : false,
        secure: process.env.NODE_ENV === "production" ? true : false,
      };

      res.cookie('jwt', token, cookieOptions);

      user.password = undefined

    res.status(statusCode).json({
      status: 'success',
      token,
      user
    });
};

//This is a middleware, for logged in users, returns the logged in users information. With preset user loaded data.
exports.LoggedIn =  catchAsync(async (req, res) => {
    const user = await User.findById(req.user.id).select('role')

    if(!user){
        return next( new appError('please log back in for a new token', 401))
    }
    
    res.json(user)
});

//sign up seller
exports.signupSeller = catchAsync(async (req, res, next) => {
    //if nested objects e,g {home:{address, address2, postcode, city}}, first deconstruct values inside object.
    const {
        name, email, shop, password, termsAndCondition, region
    } = req.body

    //to blacklist users, can only input these values
    const user = await User.create({name, email, region, shop, password, termsAndCondition})

    if(!user){
        return next(new appError("Email has been taken", 400))
    }

    createSendToken(user, 201, res);
});

//sign up buyer
exports.signupBuyer = catchAsync(async (req, res, next) => {
    //if nested objects e,g {home:{address, address2, postcode, city}}, first deconstruct values inside object.
    //to blacklist users, can only input these values
    const user = await User.create({name: req.body.name, email: req.body.email, password: req.body.password, termsAndCondition: req.body.termsAndCondition})

    if(!user){
        return next(new appError("Email has been taken", 400))
    }

    createSendToken(user, 201, res);    
});

//login users
exports.login = catchAsync(async(req, res, next) => {
    const {email, password} = req.body

    //check if password and email exist
    if(!email || !password){
        return next(new appError('Incorrect Email or Password', 401))
    }

    //check if user exist 
    const user = await User.findOne({email}).select('+password');

    if(!user || !(await user.correctPassword(password, user.password))) {
        return next(new appError("Incorrect Email or Password", 401))
    }
    //if everything okay send token to client
    createSendToken(user, 200, res);
})


//Protect routes 
exports.protect = catchAsync(async(req, res, next) => {
    //1) Get jwt token and check if its there
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1]
    } else if(req.cookies.jwt) {
        token = req.cookies.jwt
    }

    if(!token){
        return next(new appError('Login to access these features', 401))
    };

    //2) verfiy token using utils package {promisfy}
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    //3) check if user still exist
    const existingUser = await User.findById(decoded.id);
    if(!existingUser){
        return next(new appError('The user belonging to this token does not exist.', 401))
    };

    //grant access to protected route if everything is good.
    req.user = existingUser;
    next();
}) 

//restrict users from accessing certain routes 1) PICK ANY
exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            return next(new appError('You do not have permission to perform this action', 403))
        }
        next();
    }
}

//logout
exports.logout = async (req, res, next) => {
    const options = {
        expires: new Date( Date.now() + 2000),
        httpOnly: process.env.NODE_ENV === "production" ? true : false,
        secure: process.env.NODE_ENV === "production" ? true : false,
    }
    res.cookie('jwt', 'expiredtoken', options)
    res.status(200).json({
        status: 'success'
    })
};

//let logged in users update password
exports.updatePassword = catchAsync(async (req, res, next) => {
    // 1) Get user from collection
    const user = await User.findById(req.user.id).select('+password');
  
    // 2) Check if POSTed current password is correct
    if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
      return next(new appError('Please Chcek your password carefully.', 401));
    }
  
    // 3) If so, update password
    user.password = req.body.password;
    await user.save();
    // User.findByIdAndUpdate will NOT work as intended!
  
    // 4) Log user in, send JWT
    createSendToken(user, 200, res);
});

//let users change login email
exports.updateEmail = catchAsync(async (req, res, next) => {
    // 1) Get user from collection
    const user = await User.findById(req.user.id).select('+password')
  
    // 2) Check if POSTed current password is correct
    if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
      return next(new appError('Password Does not Match', 401));
    }
  
    // 3) If so, update email
    user.email = req.body.email;
    await user.save();
  
    // 4) Log user in, send JWT
    createSendToken(user, 200, res);
});

//black list users from injecting into body
exports.blackList = (...inputs) => {
    return (req, res, next) => {
        const {body} = req;
        //console.log(body)
        let bodyProps;
        for(let props in inputs){
            bodyProps = inputs[props]
            if(body[bodyProps]) delete body[bodyProps]
        }
        //console.log(req.body)
        next()
    }
}

//send reset password link to user email
exports.forgotPassword = catchAsync(async(req, res, next) => {
    //1) Get user based on post email
    const user = await User.findOne({email: req.body.email})

    if(!user){
        return next(new appError("There is no user with that email address", 404))
    }

    //2) generate random token reset token
    const resetToken = user.createPasswordResetToken();

    //set all the required field in the schema to false before we save. Issues like email and password required.
    await user.save({validateBeforeSave: false})

    //3) send to users email. Make sure to change the localhost:3000 or localhost:8000 or website
    const resetURL = `${process.env.NODE_ENV === "development" ? process.env.FRONTEND_PORT : process.env.WEBSITE_URL}/resetpassword/${resetToken}`;

    try{
        await sendForgotPasswordEmail({
            email: user.email,
            subject: 'Reset Password Link',
            url: resetURL,
            websiteLink: process.env.WEBSITE_URL,
        });

        res.status(200).json({
            status: "success",
            message: 'Token sent to email'
        })
    } catch (err){
        user.passwordResetToken === undefined;
        user.passwordResetExpires === undefined;
        await user.save({validateBeforeSave: false})

        return next(new appError("There was an error sending the email. Try again later!", 500))
    }
});



//send reset password link to user
exports.resetPassword = catchAsync(async(req, res, next) => {
    //1) get user based on token
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex')
    //2) if token has no expired, and there is user, set new password
    const user = await User.findOne({passwordResetToken: hashedToken, passwordResetExpires: {$gt: Date.now()} });
    if(!user){
        return next(new appError('Token is invalid or has expired', 400))
    }
    user.password = req.body.password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    //4) Log the user in, send jwt
    createSendToken(user, 200, res)
})