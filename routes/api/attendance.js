const express = require("express");
const router = express.Router();
const attendanceController = require("../../controllers/attendanceController");

router
  .route("/class/:id")
  .get(attendanceController.getClasswiseAttendance)
  .post();

router.route("/:id").get(attendanceController.getAttendanceById);

router
  .route("/")
  .post(attendanceController.addAttendanceCollection)
  .get(attendanceController.getAllAttendance);

router
  .route("/class/addattendance/:id")
  .post(attendanceController.addAttendanceToArray);

router
  .route("/class/deleteattendance/:id")
  .delete(attendanceController.deleteAStudentAttendance);

router
  .route("/class/getstudentattendance/:id")
  .get(attendanceController.getAttendanceByStudentId);

router
  .route("/class/datewiseattendance/:id")
  .get(attendanceController.getClasswise_DateAttendance);

module.exports = router;
