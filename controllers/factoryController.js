//CREATE CRUD OPERATIONS VERY FAST
const catchAsync = require('../utilies/catchAsync');
const appError = require('../utilies/appError');
const Features = require('../utilies/features');

exports.getOne = (Model, popOptions, popOptions2) =>
    catchAsync(async (req, res, next) => {
        let query = Model.findById(req.params.id);
        if (popOptions) query = query.populate(popOptions).populate(popOptions2)
        const doc = await query;

        if (!doc) {
            return next(new appError('No document found with that Id', 404));
        }

        res.status(200).json({
            status: 'success',
            data: {
                data: doc
            }
        });
    });

exports.getAll = (Model, popOptions, select) =>
    catchAsync(async (req, res, next) => {
        //to allow for nested GET reviews on tour(hack)
        let filter = {};
        if (req.params.tourId) filter = { fresh: req.params.tourId };
        const doclength = Model.find().length

        const features = new Features(Model.find(filter), req.query)  
            .filter()
            .sort()
            .category()
            .limitFields()
            .pagination()
            
        const doc = await features.query.populate(popOptions).select(select)

        res.status(200).json({
            results: doc.length,
            status: 'success',
            length: doclength,
            data: {
                data: doc
            }
        });
    });

exports.deleteOne = Model =>
    catchAsync(async (req, res, next) => {
        const doc = await Model.findByIdAndDelete(req.params.id);

        if (!doc) {
            return next(new appError('No document found with that ID', 404));
        }

        res.status(204).json({
            status: 'success',
            data: null
        });
    });

exports.createOne = Model =>
    catchAsync(async (req, res, next) => {
        const doc = await Model.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                data: doc
            }
        });
    });


exports.updateOne = Model =>
    catchAsync(async (req, res, next) => {
        const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!doc) {
            return next(new appError('No Tour found with that ID', 404));
        }
        res.status(200).json({
            status: 'success',
            data: {
                data: doc
            }
        });
    });