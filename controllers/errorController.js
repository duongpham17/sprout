const appError = require('../utilies/appError');

const ErrorJWTError = () => new appError('Invalid token. Please Login again', 401);
const ErrorJWTExpire = () => new appError('Token Expired. Please Login again', 401);

const ProductionMode = (err, res) => {
    //we created this error 
    if(err.isOperational){
        res.status(err.statusCode).json({
            status: err.status, 
            message: err.message
        });
    } else {
        //we did not create this error
        console.error('Error', err);

        res.status(500).json({
            status: 'Error',
            message: 'Error within server',
        });
    }
}

const DevelopmentMode = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status, 
        message: err.message,
        error: err,
        stack: err.stack,
    })
}

module.exports = ((err, req, res, next) => {
    //error not by us internal server error
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error'; 

    if(process.env.NODE_ENV === 'development'){
        DevelopmentMode(err, res);

    } else if (process.env.NODE_ENV === 'production'){
        let error = {...err}

        if(error.name === "JsonWebTokenError") error = ErrorJWTError();
        if(error.name === "TokenExpiredError") error = ErrorJWTExpire();
        ProductionMode(error, res);
    }

})