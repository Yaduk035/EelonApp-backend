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

//////////////////////////////////////////////////////////

router.route("/qbank/filter").put(lessonPlanningController.QBFiltering);

router
  .route("/qbank")
  .get(lessonPlanningController.getAllQBs)
  .post(lessonPlanningController.addQBs);

router
  .route("/qbank/:id")
  .get(lessonPlanningController.getQBsById)
  .put(lessonPlanningController.updateQB)
  .delete(lessonPlanningController.removeQB);

//////////////////////////////////////////////////////////

router
  .route("/qpattern/filter")
  .put(lessonPlanningController.QuestionPatternFiltering);

router
  .route("/qpattern")
  .get(lessonPlanningController.getAllQuestionPattern)
  .post(lessonPlanningController.addQuestionPattern);

router
  .route("/qpattern/:id")
  .get(lessonPlanningController.getQuestionPatternById)
  .put(lessonPlanningController.updateQuestionPattern)
  .delete(lessonPlanningController.removeQuestionPattern);

//////////////////////////////////////////////////////////

router
  .route("/qpaper/filter")
  .put(lessonPlanningController.QuestionPaperFiltering);

router
  .route("/qpaper")
  .get(lessonPlanningController.getAllQuestionPaper)
  .post(lessonPlanningController.addQuestionPaper);

router
  .route("/qpaper/:id")
  .get(lessonPlanningController.getQuestionPaperById)
  .put(lessonPlanningController.updateQuestionPaper)
  .delete(lessonPlanningController.removeQuestionPaper);

module.exports = router;
