const express = require("express");
const router = express.Router();
const attendanceController = require("../../controllers/attendanceController");

router.route("/:id").get(attendanceController.getClasswiseAttendance).post();

router
  .route("/")
  .post(attendanceController.addAttendance)
  .get(attendanceController.getAllAttendance);
