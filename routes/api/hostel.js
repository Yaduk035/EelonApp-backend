const express = require('express');
const router = express.Router();
const hostelController = require('../../controllers/hostelController');

//////// '/hostel/*'  ///////

router.route('/filter').put(hostelController.filterHostel);

router.route('/').get(hostelController.getAllHostels);

router.route('/:id').post(hostelController.addHostelDetails).delete(hostelController.deleteHostel);
