const express = require("express");
const router = express.Router();
const classroomController = require("../../controllers/classroomController");

router
  .route("/getstaffclassrooms/:id")
  .get(classroomController.getStaffClassrooms);
router
  .route("/getstudentclassrooms/:id")
  .get(classroomController.getStudentClassrooms);

router
  .route("/editteacher/:id")
  .put(classroomController.updateClassroomTeacher)
  .delete(classroomController.deleteTeacher);

router
  .route("/editstudent/:id")
  .put(classroomController.updateClassroomStudent)
  .delete(classroomController.deletStudent);

router
  .route("/editupcomingtask/:id")
  .put(classroomController.updateClassroomUpcomingtask);

router
  .route("/editannoucement/:id")
  .put(classroomController.updateClassroomAnnouncement);

router
  .route("/editassignment/:id")
  .put(classroomController.updateClassroomAssignment);

router
  .route("/editmaterial/:id")
  .put(classroomController.updateClassroomMaterial);

router.route("/editgrade/:id").put(classroomController.updateClassroomGrade);

router
  .route("/")
  .get(classroomController.getAllClassrooms)
  .post(classroomController.createClassroom);

router
  .route("/:id")
  .get(classroomController.getClassroom)
  .delete(classroomController.deleteClassroom);

module.exports = router;
