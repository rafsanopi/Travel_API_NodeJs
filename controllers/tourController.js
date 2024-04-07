const fs = require('fs');

const tourList = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'Success',
      statusCode: 400,
      message: 'Name and price must be added',
    });
  }
  next();
};

exports.getAllTour = (req, res) => {
  res.status(200).json({
    createdAt: req.requestTime,
    status: 'Success',
    message: 'Success',
    request: tourList.length,
    data: tourList,
  });
};

exports.getSingleTour = (req, res) => {
  const id = req.params.id * 1;

  if (id > tourList.length) {
    return res.status(404).json({
      status: 'false',
      message: 'Tour list not found',
    });
  }

  const tour = tourList.find((map) => map.id === id);
  res.status(200).json({
    status: 'Success',
    message: 'Tour list Success',

    data: tour,
  });

  // console.log(req.params);
};

exports.createTour = (req, res) => {
  // console.log(req.body);
  const newID = tourList[tourList.length - 1].id + 1;

  const newTour = Object.assign({ id: newID }, req.body);

  tourList.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tourList),
    (error) => {
      res.status(201).json({
        message: 'Success',
        data: newTour,
      });
    }
  );
};
