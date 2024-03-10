const express = require('express');
const router = express.Router();
const hostelController = require('../../controllers/hostelController');

//////// '/hostel/*'  ///////

///////  occupants  //////

router.route('/room/occupants/:id').put(hostelController.addOccupantsHostelRoom).delete(hostelController.removeOccupantsHostelRoom);

router.route('/room/filter').put(hostelController.filterHostelRoom);

router.route('/room').get(hostelController.getAllHostelRooms).post(hostelController.addHostelRoom);

router.route('/room/:id').get(hostelController.getHostelRoomById).put(hostelController.updateHostelRoom).delete(hostelController.deleteHostelRoom);

router.route('/filter').put(hostelController.filterHostel);

router.route('/').get(hostelController.getAllHostels);

router.route('/:id').post(hostelController.addHostelDetails).delete(hostelController.deleteHostel);

module.exports = router;
