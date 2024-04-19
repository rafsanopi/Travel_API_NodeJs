const fs = require('fs');

const Tour = require('./../models/tour_model');

const tourList = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'Success',
      statusCode: 400,
      message: 'Name and price must be added'
    });
  }
  next();
};

exports.getAllTour = async (req, res) => {
  try {
    const allTours = await Tour.find();
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
