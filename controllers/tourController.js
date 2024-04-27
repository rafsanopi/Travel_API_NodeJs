// const fs = require('fs');

const Tour = require('./../models/tour_model');

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

exports.aliesTop = async (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = 'price,-ratingsAverage';
  req.query.fields = 'name,price,ratingsAverage, duration';

  next();
};

exports.getAllTour = async (req, res) => {
  try {
    ///============== Qureing and Excluding some fields ==================
    const queryObj = { ...req.query };
    const excludedFields = ['sort', 'page', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);

    ///============== More Query ==================

    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      match => `$${match}`
    );

    let query = Tour.find(JSON.parse(queryString));

    ///================ Sorting ===================

    if (req.query.sort) {
      query = query.sort(req.query.sort.split(',').join(' '));
    }

    ///================ Fields ===================

    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    }

    ///================ Pagination =================

    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;

    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    const allTours = await query;
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
      status: 'Success',
      message: err.message,
      data: req
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
