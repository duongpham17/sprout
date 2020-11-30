const mongoose = require('mongoose')
const Product = require('./productModel')

const reportSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
    },
    shop:{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
},
    {
        toJSON: {virtuals: true},
        toObject: {virtuals: true}
    }
)

//calculating number of reports
reportSchema.statics.calcReportedAmount = async function(productId){
    const stats = await this.aggregate([
        //first stage, select all report belonging to the current shop being reproted
        {
            $match: {product: productId}
        },
        //second stage, calculate the statistics
        {
            $group: {
                _id: '$product',
                nRating: {$sum: 1},
            }
        },
    ]);
    
    if(stats.length > 0){
        await Product.findByIdAndUpdate(productId, {
            reported: stats[0].nRating,
        });
    } else {
        await Product.findByIdAndUpdate(productId, {
            reported: 0,
        });
    }
}

reportSchema.index({product: 1, user: 1}, {unique: true});

//now to use this stats
reportSchema.post('save', function(){
    this.constructor.calcReportedAmount(this.product);
});

//update review when it is deleted or updated, we do this.r so we can pass it to the post middleware
reportSchema.pre(/^findOneAnd/, async function(next){
    this.r = await this.findOne();
    next()
});

//after query has updated and review has updated, this is the time to use the post method
reportSchema.post(/^findOneAnd/, async function(){
    await this.r.constructor.calcReportedAmount(this.r.product);
});

const Report = mongoose.model("Report", reportSchema)
module.exports = Report