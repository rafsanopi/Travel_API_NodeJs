// const fs = require('fs');

const Tour = require('./../models/tour_model');

const APIFeature = require('./../utils/api_features');

// const tourList = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

// exports.checkBody = (req, res, next) => {
//   if (!req.body.name || !req.body.price) {
//     return res.status(400).json({
//       status: 'Success',
//       statusCode: 400,
//       message: 'Name and price must be added'
//     });
//   }
//   next();
// };

exports.getAllTour = async (req, res) => {
  try {
    ///======================= Exicute Query ==========================

    const features = new APIFeature(Tour.find(), req.query)
      .filter()
      .sort()
      .fields()
      .pagination();

    const allTours = await features.query;
    res.status(200).json({
      createdAt: req.requestTime,
      status: 'Success',
      message: 'Success',
      request: allTours.length,
      data: allTours
    });
  } catch (err) {
    res.status(404).json({
      createdAt: req.requestTime,
      status: 'Error',
      message: err.message,
      data: null
    });
  }
};

exports.getSingleTour = async (req, res) => {
  try {
    const singleTour = await Tour.findById(req.params.id);
    res.status(200).json({
      createdAt: req.requestTime,
      status: 'Success',
      message: 'Success',
      //request: allTours.length,
      data: singleTour
    });
  } catch (err) {
    res.status(404).json({
      createdAt: req.requestTime,
      status: 'Success',
      message: err.message,
      data: req
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    const tourReq = await Tour.create(req.body);
    res.status(201).json({
      message: 'Success',
      data: tourReq
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
      data: err
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({
      message: 'Success',
      data: updatedTour
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
      data: err
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    const deleteTour = await Tour.findByIdAndDelete(req.params.id, req.body);
    res.status(200).json({
      message: 'Success',
      data: deleteTour
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
      data: err
    });
  }
};

exports.aliesTop = async (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = 'price,-ratingsAverage';
  req.query.fields = 'name,price,ratingsAverage, duration';

  next();
};

exports.tourState = async (req, res) => {
  try {
    const state = await Tour.aggregate([
      {
        $match: { ratingsAverage: { $gte: 4.5 } }
      },
      {
        $group: {
          _id: { $toUpper: '$difficulty' },
          numTour: { $sum: 1 },
          numRatings: { $sum: '$ratingsQuantity' },
          avgRatings: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          maxPrice: { $max: '$price' },
          min: { $min: '$price' }
        }
      }
    ]);

    res.status(200).json({
      createdAt: req.requestTime,
      status: 'Success',
      message: 'aggregate pipeline',

      data: state
    });
  } catch (err) {
    res.status(404).json({
      createdAt: req.requestTime,
      status: 'Error',
      message: err.message
    });
  }
};
