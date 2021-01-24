const mongoose = require('mongoose');
const validator  = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Must have a name.'],
        trim: true,
    },
    shop: {
        type: String,
        trim: true,
        index: {unique: [true, 'Shop name has been taken'], sparse: true}
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Email has been taken."],
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email.'],
        trim: true,
    },
    region: {
        type: String,
        default: 'london',
        required: true,
    },
    avatar:{
        type: String,
        default: "https://firebasestorage.googleapis.com/v0/b/first-project-e6766.appspot.com/o/avatar%2Fwhite_font_single.png?alt=media&token=d6b2bb7d-9512-4af7-8753-25e61163f853"
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'ban'],
        default: 'user'
    },
    favourite:[
        {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
            }
        }
    ],
    social: [
        {
            app: {
                type: String,
                trim: true
            }
        }
    ],
    
    followingNum: {
        type: Number,
        default: 0,
    },
    followerNum:{
        type: Number,
        default: 0
    },
    good:{
        type: Number,
        default: 0,
    },
    bad:{
        type: Number,
        default: 0,
    },

    visa:{
        bank:{
            type: String,
            default: "",
        },
        first:{
            type: String,
        },
        last: {
            type: String
        },
        sortcode: {
            type: String,
        },
        accountnumber: {
            type: String
        }
    },
    paypal: {
        email:{
            type: String,
            default: "",
        },
    },
    bitcoin: {
        type: String,
        default: "",
    },
    cardano: {
        type: String,
        default: "",
    },
    litecoin: {
        type: String,
        default: "",
    },
    dash: {
        type: String,
        default: "",
    },
    vechain: {
        type: String,
        default: "",
    },
    cash: {
        type: String,
        default: "",
    },

    /* for buyer */
    addresses:[{
        title:{
            type: String
        },
        address:{
            type: String,
        },
        address2: {
            type: String,
        },
        city: {
            type: String
        },
        postcode: {
            type: String
        }
    }],

    /* for Seller */
    business:{
        show: {
            type: String,
            default: "no"
        },
        contactEmail:{
            type: String,
            lowercase: true,
            default: "",
        },
        phone: {
            type: String,
        },
        address: {
            type: String,
            default: "",
        },
        address2: {
            type: String,
        },
        city: {
            type: String,
            default: "",
        },
        postcode: {
            type: String,
            default: "",
        }
    },
    reported:{
        type: Number,
        default: 0
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        select: false
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
    termsAndCondition: {
        type: String,
        default: "accept"
    }
},
    {
        toJSON: {virtuals: true},
        toObject: {virtuals: true}
    }
)

//keeping a reference to all the child documents on the parent document, but without actually persisting that information to the database.
userSchema.virtual('ticketsSeller', {
    ref: 'Ticket', //name of the model
    foreignField: 'seller', //Here is the only id we want back, so for one user, i only wnat back seller id
    localField: '_id', //when you virtual populate, this model will automatically get a localfield that is an _id. This is where it is store.
})

userSchema.virtual('ticketsBuyer', {
    ref: 'Ticket', //name of the model
    foreignField: 'buyer', //Here is the only id we want back, so for one user, i only want back buyer id
    localField: '_id', //when you virtual populate, this model will automatically get a localfield that is an _id. This is where it is store.
})

userSchema.virtual('followings', {
    ref: 'Follow', //name of the model
    foreignField: 'current_user', //getting follows, we want this follow id that is inside all follows document to be linked to this field.
    localField: '_id', //when u virtual populate, this model will automatically get a localfield that is an _id. This is where it is store.
})

userSchema.virtual('followers', {
    ref: 'Follow', //name of the model
    foreignField: 'follow_user', //getting follows, we want this follow id that is inside all follows document to be linked to this field.
    localField: '_id', //when u virtual populate, this model will automatically get a localfield that is an _id. This is where it is store.
})

//hashing the password with package called (bcryptjs)
userSchema.pre('save', async function(next){
    //only run this when password has been modified
    if(!this.isModified('password')) return next();

    //hash password
    this.password = await bcrypt.hash(this.password, 12);

    next();
})


//instances 
//check if confirm password matches the encrypted password.
userSchema.methods.correctPassword = async function(candidatePassword, userPassword){
    return bcrypt.compare(candidatePassword, userPassword)
}

//generate a random token, to let users go to a reset password link
userSchema.methods.createPasswordResetToken = function(){
    const resetToken = crypto.randomBytes(32).toString('hex');

    //encrypt the token given to the user for the reset password link
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    //last for a total of 10minutes this token
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    return resetToken;
}



const User = mongoose.model('User', userSchema);
module.exports = User