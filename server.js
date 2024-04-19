const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('DB connection successful!'));

const tourSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Tour name is required']
  },
  ratting: {
    type: Number,
    default: 4.5
  },
  price: {
    type: Number,
    required: [true, 'Price is required']
  }
});

const Tour = mongoose.model('Tour', tourSchema);

const testTour = new Tour({
  name: 'Cox Bazar',
  price: 800,
  ratting: 4.6
});

//testTour.save();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
