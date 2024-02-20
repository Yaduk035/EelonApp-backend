const express = require("express");
const router = express.Router();
const lessonPlanningController = require("../../controllers/lessonPlanController");

router
  .route("/syllabus/filter")
  .put(lessonPlanningController.syllabusFiltering);

router
  .route("/syllabus")
  .get(lessonPlanningController.getAllSyllabus)
  .post(lessonPlanningController.addSyllabus);

router
  .route("/syllabus/:id")
  .get(lessonPlanningController.getSyllabusById)
  .put(lessonPlanningController.updateSyllabus)
  .delete(lessonPlanningController.removeSyllabus);

module.exports = router;
