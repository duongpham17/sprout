const mongoose = require('mongoose');
const User = require('./userModel');

const followSchema = new mongoose.Schema({
    current_user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    follow_user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
},
    {
        toJSON: {virtuals: true},
        toObject: {virtuals: true}
    }
)

//calculating ratingsAverage and ratingsQuantity using a STATIC method
followSchema.statics.calcTotalFollowings = async function(user_id){
    const stats = await this.aggregate([
        //first stage, select all current_user belonging to the current user
        {
            $match: {current_user : user_id}
        },
        //second stage, calculate the statistics. NOTE: Always put _id first, _id means what documents have in common that we want to group by.
        {
            $group: {
                _id: '$current_user',
                nRating: {$sum: 1},
            }
        },
    ]);
    
    if(stats.length > 0){
        await User.findByIdAndUpdate(user_id, {
            followingNum: stats[0].nRating,
        });
    } else {
        await User.findByIdAndUpdate(user_id, {
            followingNum: 0,
        });
    }
}

//calculating ratingsAverage and ratingsQuantity using a STATIC method
followSchema.statics.calcTotalFollowers = async function(user_id){
    const stats = await this.aggregate([
        //first stage, select all current_user belonging to the current user
        {
            $match: {follow_user : user_id}
        },
        //second stage, calculate the statistics. NOTE: Always put _id first, _id means what documents have in common that we want to group by.
        {
            $group: {
                _id: '$follow_user',
                nRating: {$sum: 1},
            }
        },
    ]);

    if(stats.length > 0){
        await User.findByIdAndUpdate(user_id, {
            followerNum: stats[0].nRating,
        });
    } else {
        await User.findByIdAndUpdate(user_id, {
            followerNum: 0,
        });
    }
}

followSchema.index({current_user: 1, follow_user: 1}, {unique: true});

//current_user stats
followSchema.post('save', function(){
    this.constructor.calcTotalFollowings(this.current_user);
});
//update follow when it is deleted or updated, we do this.r so we can pass it to the post middleware
followSchema.pre(/^findOneAnd/, async function(next){
    this.r = await this.findOne();
    next()
});
//after query has updated and follow has updated, this is the time to use the post method
followSchema.post(/^findOneAnd/, async function(){
    await this.r.constructor.calcTotalFollowings(this.r.current_user);
});

//follow_user stats
followSchema.post('save', function(){
    this.constructor.calcTotalFollowers(this.follow_user);
});
followSchema.pre(/^findOneAnd/, async function(next){
    this.r = await this.findOne();
    next()
});
followSchema.post(/^findOneAnd/, async function(){
    await this.r.constructor.calcTotalFollowers(this.r.follow_user);
});



const Follow = mongoose.model("Follow", followSchema)
module.exports = Follow

