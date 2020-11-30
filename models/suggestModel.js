const mongoose = require('mongoose')

const suggestModel = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    },
    message: {
        type: String,
        trim: true
    },
    delId: {
        type: String,
        default: 1,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
})

const Suggest = mongoose.model("Suggest", suggestModel)
module.exports = Suggest