const mongoose = require('mongoose');

const tourSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Tour name is required'],
    unique: false
  },
  rating: {
    type: Number,
    default: 4.5
  },
  price: {
    type: Number,
    required: [true, 'Price is required']
  }
});

const Tour = mongoose.model('tour', tourSchema);

module.exports = Tour;

// const testTour = new Tour({
//     name: 'Cox Bazar',
//     price: 800,
//     ratting: 4.6
//   });

//testTour.save();
