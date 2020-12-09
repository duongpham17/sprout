const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    },
    reported:{
        type: Number,
        default: 0
    },
    view: {
        type: Number,
        default: 1,
    },
    price: {
        type: Number,
        required: [true, 'Product must have a price'],
        set: val => Math.round(val * 10) / 10
    },
    quantity: {
        type: Number,
        required: [true, 'Product must have a quantity']
    },
    minimumQuantity: {
        type: Number
    },
    description_title: {
        type: String,
        trim: true,
    },
    descriptionOne: {
        type: String,
        trim: true,
    },
    supplier: {
        type: String,
        default: 'no'
    },
    region: {
        type: String,
        required: [true, "Please select a region"]
    },
    category: {
        type: String,
        lowercase: true,
    },
    type: {
        type: String,
        lowercase: true,
    },
    ratingsAverage: {
        type: Number,
        default: 4,
        max: [5, "Rating must be below 5"],
        set: val => Math.round(val * 10 ) / 10
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    },
    image: [
        {
            url: {
                type: String,
            }
        }
    ],
    delivery:{
        type: String,
        default: "no"
    },
    collect: {
        type: String,
        default: "no"
    },
    est_delivery: {
        type: String,
        trim: true,
        default: "none"
    },
    cost_delivery: {
        type: Number,
        default: 0,        
        set: val => Math.round(val * 10) / 10
    },
    return_policy: {
        type: String,
        default: "Unknown"
    },
    
    //DESCRIPTION AREA
    description: {
        description_one: {
            title: {
                type: String,
                trim: true,
                default: ''
            },
            des: {
                type: String,
                trim: true,
                default: ''
            }
        },
        description_two:{
            title: {
                type: String,
                trim: true,
                default: ''
            },
            des: {
                type: String,
                trim: true,
                default: ''
            }
        },
        description_three: {
            title: {
                type: String,
                trim: true,
                default: ''
            },
            des: {
                type: String,
                trim: true,
                default: ''
            }
        },
    },
    //DATES
    actualCreatedAt:{
        type: Date,
        default: Date.now()
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    relistDate: {
        type: Date,
        default: Date.now() + (12 * 24 * 60 * 60 * 1000)
    },

    //Allergens
    allergens:{
        nuts:{
            type: String,
            default: 'no'
        },
        fish:{
            type: String,
            default: 'no'
        },
        celery: {
            type: String,
            default: 'no'
        },
        crustaceans:{
            type: String,
            default: 'no'
        },
        milk:{
            type: String,
            default: 'no'
        },
        mustard: {
            type: String,
            default: 'no'
        },
        peanuts:{
            type: String,
            default: 'no'
        },
        soya:{
            type: String,
            default: 'no'
        },
        wheat: {
            type: String,
            default: 'no'
        },
        eggs:{
            type: String,
            default: 'no'
        },
        lupin:{
            type: String,
            default: 'no'
        },
        mollus: {
            type: String,
            default: 'no'
        },
        sesame:{
            type: String,
            default: 'no'
        },
        sulphur:{
            type: String,
            default: 'no'
        }
    }
},
    {
        toJSON: {virtuals: true},
        toObject: {virtuals: true}
    }
)

//keeping a reference to all the child documents on the parent document, but without actually persisting that information to the database.
productSchema.virtual('reviews', {
    ref: 'Review', //name of the model
    foreignField: 'product', //getting one product, we want this one product id that is inside all reviews with this product id to be linked to this.
    localField: '_id', //when u virtual populate, this model will automatically get a localfield that is an _id. This is where it is store.
})


const Product = mongoose.model('Product', productSchema)
module.exports = Product