const express = require("express");
const router = express.Router();
const cloudinaryController = require("../../controllers/cloudinaryController");

router
  .route("/studentprofile/:id")
  .post(cloudinaryController.addProfileImage)
  .delete(cloudinaryController.deleteStudentProfileImg);

module.exports = router;
