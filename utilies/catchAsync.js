//use catchAsync to get rid of the trycatch block
module.exports = fn => {
    return (req, res, next) => {
    fn(req, res, next).catch(next)
    };
};