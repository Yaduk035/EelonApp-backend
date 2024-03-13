const express = require('express');
const router = express.Router();
const attendanceController = require('../../controllers/attendanceController');
const staffAttendanceController = require('../../controllers/staffAttendanceController');

router.route('/class/:id').get(attendanceController.getClasswiseAttendance);

router.route('/staff/:id').get(staffAttendanceController.getAttendanceById);

router.route('/staff/filter').put(staffAttendanceController.filterAttendance);

router.route('/staff').post(staffAttendanceController.addAttendanceCollection).get(staffAttendanceController.getAllAttendance);

router.route('/class/addattendance/:id').post(attendanceController.addAttendanceToArray);

router.route('/staff/addattendance/:id').post(staffAttendanceController.addAttendanceToArray);

router.route('/class/deleteattendance/:id').delete(attendanceController.deleteAStudentAttendance);

router.route('/staff/deleteattendance/:id').delete(staffAttendanceController.deleteAStaffAttendance);

router.route('/class/getstudentattendance/:id').get(attendanceController.getAttendanceByStudentId);

router.route('/staff/getstaffattendance/:id').get(staffAttendanceController.getAttendanceByStaffId);

router.route('/class/datewiseattendance/:id').put(attendanceController.getClasswise_DateAttendance);

router.route('/staff/datewiseattendance').put(staffAttendanceController.getDatewiseAttendance);

router.route('/filter').put(attendanceController.filterAttendance);

router.route('/:id').get(attendanceController.getAttendanceById);

router.route('/').post(attendanceController.addAttendanceCollection).get(attendanceController.getAllAttendance);

module.exports = router;
