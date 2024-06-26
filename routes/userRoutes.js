const express = require('express');

const router = express.Router();

const userController = require('./../controllers/userController');

router.route('/').get(userController.getAllUser);
router.route('/:id').get(userController.getSingleUser);

module.exports = router;
