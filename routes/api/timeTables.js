const express = require("express");
const router = express.Router();
const timetableController = require("../../controllers/timetableController");

router
  .route("/class/template/editarray/:id")
  .put(timetableController.addTimetableToArray)
  .delete(timetableController.deleteTimetableFromArray);

router
  .route("/class/template/dropdowns")
  .get(timetableController.getTemplateDropdowns);

router
  .route("/class/template/:id")
  .get(timetableController.getTemplateByTemplateId)
  .put(timetableController.updateTemplateById)
  .delete(timetableController.deleteTemplateById);

router
  .route("/classwise")
  .post(timetableController.addClasswiseTimetable)
  .put(timetableController.updateClasswiseTimetable);

router
  .route("/class/template")
  .get(timetableController.getTemplates)
  .post(timetableController.addTemplate);

module.exports = router;
