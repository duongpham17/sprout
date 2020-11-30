const User = require('../models/userModel');
const Ticket = require('../models/ticketModel');
const appError = require('../utilies/appError');
const catchAsync = require('../utilies/catchAsync');
const Feature = require('../utilies/features');

/* Populate Ticket page with information we need. MAIN AREA */

// variable //
const populate_tickets_orders = async (req) => {
    const data = await User.findById(req)
    .select('ticketsSeller, ticketsBuyer')
    .populate({path: 'ticketsSeller', match: {status: ['awaiting', 'approved', 'sent', 'received', 'rating']}, populate:{path: 'buyer', select:['email', 'phone', 'contactEmail', 'good', 'bad', 'home', 'business']} })
    .populate({path: 'ticketsBuyer', match: {status: ['awaiting', 'approved', 'sent', 'received', 'rating']}, populate:{path: 'seller buyer', select:['good', 'bad', 'home', 'email', 'business', 'contactEmail','phone', 'visa', 'paypal', 'bitcoin', 'cardano', 'litecoin', 'dash', 'vechain', 'cash']} })

    return data
}
// // //

//get All ticket 
exports.getAllTicket = catchAsync(async(req, res, next) => {
    const ticket = await Ticket.find()
    .populate('ticketsSeller')
    .populate('ticketsBuyer')

    if(!ticket){
        return next(new appError("Connection issue. Please Reload.", 400))
    }

    res.status(200).json({
        length: ticket.length,
        status: 'success',
        ticket
    })
})


//get all tickets associated with the user id
exports.getUserTicketsLengthOnly = catchAsync(async(req, res, next) => {
    const user = await User.findById(req.user.id)
    .select('ticketsSeller, ticketsBuyer')
    .populate({path: 'ticketsSeller', match: {status: ['awaiting', 'approved', 'sent', 'received', 'rating']}, select:['buyer', 'seller']})
    .populate({path: 'ticketsBuyer', match: {status: ['awaiting', 'approved', 'sent', 'received', 'rating']}, select:['buyer', 'seller']})

    if(!user){
        return next(new appError("Connection issue. Please Reload.", 400))
    }

    res.status(201).json({
        status: 'success',
        user
    })
})

//create ticket
exports.createTicket = catchAsync(async(req, res, next) => {
 
    const ticketcreation = await Ticket.create({
        buyer: req.user.id, // id from logged in user
        seller: req.body.seller, //id from product, which should have seller id, because they created it.
        product: req.params.id, //id from product it self
        status :req.body.status, 
        quantity: req.body.quantity,
        price: req.body.price,
        description: req.body.description,
        collect: req.body.collect,
        delivery2: req.body.delivery2,
        deliveryCost: req.body.deliveryCost,
        deliveryDate: req.body.deliveryDate
    })
    
    //ticket does not exist or something went wrong
    if(!ticketcreation){
        return next(new appError('Connection issue. Please reload.', 400))
    }

   //in order to update the orders in react, we must return the same as getUsertickets, but here we first create the ticket and then return the new updated result.
   const ticket = await User.findById(req.user.id)
    .select('ticketsSeller, ticketsBuyer')
    .populate({path: 'ticketsSeller', match: {status: ['awaiting', 'approved', 'sent', 'received', 'rating']}, select:['buyer', 'seller']})
    .populate({path: 'ticketsBuyer', match: {status: ['awaiting', 'approved', 'sent', 'received', 'rating']}, select:['buyer', 'seller']})

    res.status(200).json({
       status: 'success',
       ticket
   })
})

//get all tickets associated with the user id. Use match to match status: to only awaiting, status, sent, received, rating.
//makes our result come back much faster.
exports.getUserTickets = catchAsync(async(req, res, next) => {
    const user = await populate_tickets_orders(req.user.id)

    if(!user){
        return next(new appError("Connection issue. Please Reload.", 400))
    }

    res.status(201).json({
        status: 'success',
        user
    })
}) 


//update ticket, approve, sent, received ,rating 
exports.updateTicket = catchAsync(async(req, res, next) => {
    //simply update what is put inside the req.body
    const updateticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })

    if(!updateticket){
        return next(new appError('This ticket does not exist anymore', 400))
    }

    //in order to update react without reloading, we must return the same as getUsertickets
    const ticket = await populate_tickets_orders(req.user.id)

    res.status(201).json({
        status: 'success',
        ticket
    })
})

//Payment details
exports.updatePaymentDetails = catchAsync(async(req, res, next) => {

    //deconstruct the Ticket Model objects.
    const { 
        delivery, status, payment, 
        opt_1, opt_2, opt_3, opt_4, opt_5, opt_6, cryptoTransId,
        address_s, address2_s, city_s, postcode_s,
        address_b, address2_b, city_b, postcode_b
    } = req.body

    //Only want back these data. anything else will be ignored
    const updateticket = await Ticket.findByIdAndUpdate(req.params.id, 
    {
        payment, delivery, status,
        transactionId: {opt_1, opt_2, opt_3, opt_4, opt_5, opt_6, cryptoTransId},
        buyerHome:{address_b, address2_b, city_b, postcode_b},
        sellerHome:{address_s, address2_s, city_s, postcode_s},
    }
    , 
    { new: true}
    )

    if(!updateticket){
        return next(new appError('This ticket does not exist anymore', 400))
    }

    const ticket = await populate_tickets_orders(req.user.id)

    res.status(201).json({
        status: 'success',
        ticket
    })
})

//delete ticket
exports.deleteTicket = catchAsync(async(req, res, next) => {
    const deleteticket = await Ticket.findByIdAndDelete(req.params.id)
    
    if(!deleteticket){
        return next( new appError('This ticket no longer exist', 400))
    }

    const ticket = await populate_tickets_orders(req.user.id)

    res.status(200).json({
        status: "success",
        ticket
    })
})

//update points for users at the end of payment completion
exports.trustPoints = catchAsync(async(req, res, next) => {

    const {good, bad, scoreSeller, scoreBuyer} = req.body
    
    const user = await User.findByIdAndUpdate(req.params.id, {good, bad}, {new: true})

    const score = await Ticket.findByIdAndUpdate(req.params.ticketId, {scoreSeller, scoreBuyer}, {new: true})

    if(!user || !score){
        return next( new appError('No user with that id. Please log in again.', 401))
    }

    const ticket = await populate_tickets_orders(req.user.id)

    res.status(200).json({
        status: 'success',
        ticket
    })
})


/* TICKET BIN AREA  ***************************************************************/

// varaibles //
const select_bin = ['-product', '-__v', '-deleteHistoryDate', '-collect', '-delivery2', '-scoreBuyer', '-scoreSeller']
const select_bin_path = ['phone', 'home', 'email', 'business.contactEmail']
// // //

//updating createdAt, for 30 days if anything goes wrong with payment or a cancellation happens then user can cancel it. only after 30 days.
exports.updateTime = catchAsync(async(req, res, next) => {
    //simply update what is put inside the req.body
    const updateticket = await Ticket.findById(req.params.id)

    if(!updateticket){
        return next(new appError('This ticket does not exist anymore', 400))
    }

    //first, find the difference between the date created and the day user is going to delete E.g date.now() - day createdAt
    const timeDifference  = Date.now() - Date.parse(updateticket.deleteDate)
    //second, add that time difference to the current date
    const timeNow = timeDifference + (Date.parse(updateticket.deleteDate))
    //third, now we need to give it a new date in the future. Equation is E.g 30 days = 30 * 24 * 60 * 60 * 1000
    const days = timeNow + (30 * 24 * 60 * 60 * 1000) 
    //fourth, convert date value from 1603155031673 to E.g 2020-10-20T00:54:58.334Z
    const convertedTime = new Date(days)
    //finally add convertedTime to req.body.

    //Note: this only updates the date once, until time difference has been achieved

    await Ticket.findByIdAndUpdate(req.params.id, {deleteDate: convertedTime}, {
        new: true
    })

    //in order to update the orders in react, we must return the same as getUsertickets, but here we first create the ticket and then return the new updated result.
    const ticket = await populate_tickets_orders(req.user.id)

    res.status(201).json({
        status: 'success',
        ticket
    })
})

//get buyer ticket bin
exports.getBuyerTicketBin = catchAsync(async(req, res, next) => {
    //find and add query parameters
    const ticket = await User.findById(req.user.id)
    .select('ticketsBuyer')
    .populate({path: 'ticketsBuyer', match: {status: ['bin']}, select:select_bin, populate:{path: 'seller buyer', select:select_bin_path} })

    //if no product then return an error
    if(!ticket) {
        return next(new appError('No Ticket has been sent to history', 400))
    }

    //if all good, then return length of product created and the product documents data.
    res.status(200).json({
        status: 'success',
        ticket
    })
})

//delete buyer ticket bin
exports.deleteBuyerTicketBin = catchAsync(async(req, res, next) => {
    const deleteticket = await Ticket.findByIdAndDelete(req.params.id)
    
    if(!deleteticket){
        return next( new appError('This ticket no longer exist', 400))
    }

    //in order to update the orders in react, we must return the same.
    const ticket = await User.findById(req.user.id)
    .select('ticketsBuyer')
    .populate({path: 'ticketsBuyer', match: {status: ['bin']}, select:select_bin, populate:{path: 'seller buyer', select:select_bin_path} })
 
    res.status(200).json({
        status: "success",
        length: ticket.length,
        ticket
    })
})

//get seller ticket bin
exports.getSellerTicketBin = catchAsync(async(req, res, next) => {
    //find and add query parameters
    const ticket = await User.findById(req.user.id)
    .select('ticketsSeller')
    .populate({path: 'ticketsSeller', match: {status: ['bin']}, select:select_bin, populate:{path: 'seller buyer', select:select_bin_path} })


    //if no product then return an error
    if(!ticket) {
        return next(new appError('No Ticket has been sent to history', 400))
    }

    //if all good, then return length of product created and the product documents data.
    res.status(200).json({
        status: 'success',
        ticket
    })
})

//delete ticket
exports.deleteSellerTicketBin = catchAsync(async(req, res, next) => {
    const deleteticket = await Ticket.findByIdAndDelete(req.params.id)
    
    if(!deleteticket){
        return next( new appError('This ticket no longer exist', 400))
    }

    //in order to update the orders in react, we must return the same.
    const ticket = await User.findById(req.user.id)
    .select('ticketsSeller')
    .populate({path: 'ticketsSeller', match: {status: ['bin']}, select:select_bin, populate:{path: 'seller buyer', select:select_bin_path} })
 
    res.status(200).json({
        status: "success",
        length: ticket.length,
        ticket
    })
})


/* TICKET HISTORY AREA ***************************************************************/

// variables //
const select_history = [
    'status', 'createdAt', 'deleteHistoryDate', 'buyer', 'quantity', 'price', 'description', 'deliveryCost', 
    'payment', 'transactionId'
]

const populate_tickets_seller_history = async (req) => {
    const data = await Ticket.find({seller: req, status: 'history'})
    .sort({'createdAt': -1})
    .select(['-product', '-seller', '-__v', '-deleteDate', '-collect', '-delivery2', '-scoreBuyer', '-scoreSeller', '-delivery'])
    return data
}
// // //

//Get buy history for buyers
exports.getBuyerTicketHistory = catchAsync(async(req, res, next) => {
    //find and add query parameters
    const tickets = new Feature (Ticket.find({buyer: req.user.id}), req.query).sort().pagination().filter()

    //query the tickets
    const ticket = await tickets.query.select(select_history)

    //if no product then return an error
    if(!ticket) {
        return next(new appError('No Ticket has been sent to history', 400))
    }

    //if all good, then return length of product created and the product documents data.
    res.status(200).json({
        status: 'success',
        length: ticket.length,
        ticket
    })
})

//Get sell history for sellers
exports.getSellerTicketHistory = catchAsync(async(req, res, next) => {
    //find and add query parameters
    const tickets = new Feature (Ticket.find({seller: req.user.id}), req.query).sort().pagination().filter()

    //query the tickets
    const ticket = await tickets.query.select(select_history)

    //if no product then return an error
    if(!ticket) {
        return next(new appError('No Ticket has been sent to history', 400))
    }

    //if all good, then return length of product created and the product documents data.
    res.status(200).json({
        status: 'success',
        length: ticket.length,
        ticket
    })
})

//let sellers delete history after 6 months
exports.deleteSellerTicketHistory = catchAsync(async(req, res, next) => {
    await Ticket.findByIdAndDelete(req.params.id)

    //in order to update react without reloading
    const ticket = await populate_tickets_seller_history(req.user.id)

    //if no product then return an error
    if(!ticket) {
        return next(new appError('No Ticket has been sent to history', 400))
    }

    //if all good, then return length of product created and the product documents data.
    res.status(200).json({
        status: 'success',
        ticket
    })
})

//let users undo, status: from history to recieved. for purposes like address and payment.
exports.undoSellerTicketHistory = catchAsync(async(req, res, next) => {
    await Ticket.findByIdAndUpdate(req.params.id, {status: req.body.status}, {new: true})

    //in order to update react without reloading.
    const ticket = await populate_tickets_seller_history(req.user.id)

    //if no product then return an error
    if(!ticket) {
        return next(new appError('No Ticket has been sent to history', 400))
    }

    //if all good, then return length of product created and the product documents data.
    res.status(200).json({
        status: 'success',
        ticket
    })
})
