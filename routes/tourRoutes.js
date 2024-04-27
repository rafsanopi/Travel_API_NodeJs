const express = require('express');

const router = express.Router();

const tourController = require('./../controllers/tourController');

///================================== Parem MiddleWare ====================================

// router.param('id', (req, res, next, val) => {
//   console.log(`This is Id ${val}`);

//   next();
// });

router.route('/top-5').get(tourController.aliesTop, tourController.getAllTour);

router
  .route('/')
  .get(tourController.getAllTour)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getSingleTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
