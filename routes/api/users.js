const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController");
const notificationController = require("../../controllers/notificationController");

//////////////    Admin routes     ////////////////
router
  .route("/admin")
  .get(userController.getAdmins)
  .post(userController.addAdmin);
// router.route("/student/:id").delete(userController.deleteAdmin);

//////////////    Student routes     ////////////////
router
  .route("/student/issuelibrarycard/:id")
  .put(userController.issueLibCard)
  .get(userController.getStudentByNameIssueLib);

router.route("/student/pagination").get(userController.getStudentsByLimit);
router.route("/student/filter").put(userController.filterStudentsByclass);

router.route("/student/filterbydata").put(userController.studentFiltering);

router
  .route("/student")
  .get(userController.getStudents)
  .post(userController.addStudent);
router
  .route("/student/:id")
  .delete(userController.deleteStudent)
  .get(userController.getStudentById)
  .put(userController.updateStudent);
router.route("/student/search/:id").get(userController.getStudentByName);

//////////////    Staff routes     ////////////////
router
  .route("/staff/notifications")
  .get(notificationController.getAllNotifications)
  .post(notificationController.postNotifications);
router
  .route("/staff/notifications/:id")
  .get(notificationController.getNotificationsByClass)
  .delete(notificationController.deleteNotification);

router.route("/staff/filter").put(userController.staffFiltering);

router
  .route("/staff")
  .get(userController.getUsers)
  .post(userController.addStaff);
router
  .route("/staff/:id")
  .delete(userController.deleteStaff)
  .get(userController.getIndividualStaff)
  .put(userController.updateStaff);
// router.route('/staff')

module.exports = router;
