const express = require("express");
const router = express.Router();
const cloudinaryController = require("../../controllers/cloudinaryController");
const multer = require("multer");

router
  .route("/studentprofile/:id")
  .post(cloudinaryController.addProfileImage)
  .delete(cloudinaryController.deleteStudentProfileImg);

router.route("/syllabus").post(cloudinaryController.addSyllabusPdf);

module.exports = router;
