const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController");

router.route("/").get(userController.getUsers).post(userController.addUser);
router.route("/:id").delete(userController.deleteUsers);

router
  .route("/student")
  .get(userController.getStudents)
  .post(userController.addStudent);
router.route("/student/:id").delete(userController.deleteStudent);

module.exports = router;
