const express = require('express');

const router = express.Router();

const tourController = require('./../controllers/tourController');

///================================== Parem MiddleWare ====================================

// router.param('id', (req, res, next, val) => {
//   console.log(`This is Id ${val}`);

//   next();
// });

router
  .route('/')
  .get(tourController.getAllTour)
  .post(tourController.checkBody, tourController.createTour);

router.route('/:id').get(tourController.getSingleTour);

module.exports = router;
