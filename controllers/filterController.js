// CATEGORY & FILTER -- MIDDLEWARE FOR QUERY //

/*** FILTER ***/

// Limit the pagination, E.g here 10 result per page
exports.LimitPage10 = (req, res, next) => {
    req.query.limit = '10';
    next();
};

exports.LimitPage20 = (req, res, next) => {
    req.query.limit = '20';
    next();
};

exports.LimitPage500 = (req, res, next) => {
    req.query.limit = '500';
    next();
};

exports.SortByViews = (req, res, next) => {
    req.query.sort = '-view';
    next();
};

// Created at : time of creation
exports.CreatedAt = (req, res, next) => {
    req.query.sort = '-createdAt';
    next();
};

// Top 100 Products
exports.TopProducts = (req, res, next) => {
    req.query.limit = '100';
    req.query.sort = '-views';
    next();
};

/*** CATEGORY ***/
exports.Category = (req, res, next) => {
    const {category} = req.query
    req.query.category = category;
    next()
}

/*** Latest following post ***/
exports.Following = (req, res, next) => {
    req.query.sort = '-createdAt';
    next();
};

/* find latest history for tickets */
exports.History = (req, res, next) => {
    req.query.status = 'history';
    req.query.sort = '-createdAt';
    next();
};

/* find latest history for tickets */
exports.Bin = (req, res, next) => {
    req.query.status = 'bin';
    req.query.limit = '100';
    req.query.sort = '-createdAt';
    next();
};

