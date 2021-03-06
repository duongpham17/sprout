const express = require('express');
const path = require('path')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');

const userRoutes    = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const reviewRoutes  = require('./routes/reviewRoutes');
const ticketRoutes  = require('./routes/ticketRoutes');
const followRoutes  = require('./routes/followRoutes');
const adminRoutes   = require('./routes/adminRoutes');
const statRoutes    = require('./routes/statRoutes');
const authRoutes    = require('./controllers/authController');

const {errorMessage} = require('./util/CatchError');

const dotenv = require('dotenv')
dotenv.config({ path: "./config.env" });

const app = express();

//use to fetch data from another cross site origin, E.g front end is at localhost:3000 backend is at localhost:8000
app.use(cors({
    //this has to be frontend localhost
    origin: process.env.NODE_ENV === "production" ? process.env.WEBSITE_URL :  process.env.FRONTEND_PORT,
    credentials: true,
}));

const limiter = (rate, minute, message) => rateLimit({
    max: rate,
    windowMs: minute * 60 * 1000,
    message: message
})

app.use(`/users/login`, limiter(10, 5, "Max attempt. Try again in 5 minutes" ));
app.use(`/users/contact`, limiter(1, 10, "Please wait 10min before resending an email. Thank You."))
app.use(`/users/forgotpassword`, limiter(5, 3, "Please check your junk, or try again in 3 minutes"))
app.use(`/tikets/create`, limiter(15, 5, "Easy tiger your buying too much. 3minute cooldown."))

//SECURITY/ Data sanitization against NoSQL query injection
app.use(mongoSanitize());
//SECURITY/ Data sanitization against XSS
app.use(xss());

//VERY IMPORTANT// Body-parser, reading data from body into req.body Set limit 100kb < body will get rejected,
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({extended: true, limit: '100kb'}))

//cookie parser for login, authnetication
app.use(cookieParser());

// we want to be able to change the users data, since role and certain items are blacklisted.
app.use('/admins', adminRoutes)
//any endpoint trying to inject blackList params into body will be rejected
app.use(authRoutes.blackList('role'));
/* Mounting Routers */
app.use('/users',    userRoutes)
app.use('/products', productRoutes)
app.use('/reviews',  reviewRoutes)
app.use('/tickets',  ticketRoutes)
app.use('/follows',  followRoutes)
app.use('/stats',    statRoutes)

if(process.env.NODE_ENV === 'production'){
    //set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

//Global error handler makes errors have a nicer return message, --> errorController, for development
// this will work when next() is hit with an error it will go to this error handler.
app.use(errorMessage)

module.exports = app