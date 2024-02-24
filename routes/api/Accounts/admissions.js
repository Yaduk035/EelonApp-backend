const express = require("express");
const router = express.Router();
const admissionController = require("../../../controllers/Accounts/admissionController");

router
  .route("/")
  .get(admissionController.getAllStudents)
  .post(admissionController.addStudent);

router
  .route("/:id")
  .get(admissionController.getStudentsById)
  .put(admissionController.updateStudent)
  .delete(admissionController.deleteStudent);

module.exports = router;
