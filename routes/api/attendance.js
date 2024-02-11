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

module.exports = router;
