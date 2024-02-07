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
  .route("/getclassroomsteachers/:id")
  .get(classroomController.getClassroomTeachers);

router
  .route("/getclassroomsstudents/:id")
  .get(classroomController.getClassroomStudents);

///////////////////////

router
  .route("/editteacher/:id")
  .put(classroomController.updateClassroomTeacher)
  .delete(classroomController.deleteTeacher);

router
  .route("/editstudent/:id")
  .put(classroomController.updateClassroomStudent)
  .delete(classroomController.deletStudent);

router
  .route("/upcomingtask/:id")
  .put(classroomController.updateClassroomUpcomingtask)
  .delete(classroomController.deleteClassroomUpcomingTask)
  .get(classroomController.getUpcomingTasks);

router
  .route("/annoucement/:id")
  .put(classroomController.updateClassroomAnnouncement)
  .delete(classroomController.deleteClassroomAnnouncement)
  .get(classroomController.getAnnouncements);

router
  .route("/assignment/:id")
  .put(classroomController.updateClassroomAssignment)
  .delete(classroomController.deleteClassroomAssignment)
  .get(classroomController.getAssignments);

router
  .route("/material/:id")
  .put(classroomController.updateClassroomMaterial)
  .delete(classroomController.deleteClassroomMaterial)
  .get(classroomController.getMaterials);

router
  .route("/grade/:id")
  .put(classroomController.updateClassroomGrade)
  .delete(classroomController.deleteClassroomGrade)
  .get(classroomController.getGrades);

router
  .route("/")
  .get(classroomController.getAllClassrooms)
  .post(classroomController.createClassroom);

router
  .route("/:id")
  .get(classroomController.getClassroom)
  .delete(classroomController.deleteClassroom);

module.exports = router;
