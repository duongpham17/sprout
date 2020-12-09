const mongoose = require('mongoose')

const ticketSchema = new mongoose.Schema({
    seller:{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: ['Ticket must for a seller user']
    },
    buyer:{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: ['Ticket must for a buyer user']
    },
    product:{
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: ['Ticket must come from a product ']
    },
    status: {
        type: String,
        default: "awaiting"
    },
    quantity: {
        type: Number,
    },
    price: {
        type: Number
    },
    description: {
        type: String,
    },

    
    scoreBuyer:{
        type: String,
        default: "no"
    },
    scoreSeller: {
        type: String,
        default: 'no'
    },

    //COLLECTING OR DELIVERING
    delivery: {
        type: String,
        default: ""
    },
    collect: {
        type: String,
        default: ""
    },
    delivery2: {
        type: String,
        default: ""
    },
    deliveryDate:{
        type: String,
        default: "none"
    },
    deliveryCost:{
        type: Number,
    },
    buyerHome:{
        address_b:{
            type: String
        },
        address2_b: {
            type: String,
        },
        city_b: {
            type: String
        },
        postcode_b: {
            type: String
        }
    },
    sellerHome:{
        address_s:{
            type: String
        },
        address2_s: {
            type: String,
        },
        city_s: {
            type: String
        },
        postcode_s: {
            type: String
        }
    },

    //payment
    payment: {
        type: String,
    },
    transactionId: {
        opt_1:{
            type: String,
            default: "",
        },
        opt_2:{
            type: String,
        },
        opt_3:{
            type: String,
        },
        opt_4:{
            type: String,
        },
        opt_5:{
            type: String,
        },
        opt_6:{
            type: String,
        },
        cryptoTransId: {
            type: String,
        }
    },

    //DATES
    createdAt: {
        type: Date,
        default: Date.now()
    },
    deleteDate: {
        type: Date,
        default: Date.now()
    },
    deleteHistoryDate:{
        type: Date,
        default: Date.now() + (365 * 24 * 60 * 60 * 1000)
    }
},
    {
        toJSON: {virtuals: true},
        toObject: {virtuals: true}
    }
)

const Ticket = mongoose.model("Ticket", ticketSchema)
module.exports = Ticket