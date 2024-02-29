const express = require("express");
const router = express.Router();
const cloudinaryController = require("../../controllers/cloudinaryController");
const multer = require("multer");
////////////  'images/*'  /////////////
router
  .route("/studentprofile/:id")
  .post(cloudinaryController.addProfileImage)
  .delete(cloudinaryController.deleteStudentProfileImg);

router
  .route("/student/father/:id")
  .post(cloudinaryController.addFatherProfileImage)
  .delete(cloudinaryController.deleteFatherProfileImg);

router
  .route("/student/mother/:id")
  .post(cloudinaryController.addMotherProfileImage)
  .delete(cloudinaryController.deleteMotherProfileImg);

router.route("/syllabus").post(cloudinaryController.addSyllabusPdf);

module.exports = router;
