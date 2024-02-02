const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController");

router
  .route("/admin")
  .get(userController.getStudents)
  .post(userController.addAdmin);
router.route("/student/:id").delete(userController.deleteAdmin);

router
  .route("/student")
  .get(userController.getStudents)
  .post(userController.addStudent);
router.route("/student/:id").delete(userController.deleteStudent);

router
  .route("/staff")
  .get(userController.getUsers)
  .post(userController.addStaff);
router.route("/:id").delete(userController.deleteStaff);
// router.route('/staff')

module.exports = router;
