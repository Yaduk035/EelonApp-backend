const express = require("express");
const router = express.Router();
const timetableController = require("../../controllers/timetableController");

router
  .route("/class/editarray/:id")
  .put(timetableController.addTimetableToArray)
  .delete(timetableController.deleteTimetableFromArray);

router
  .route("/class/:id")
  .get(timetableController.getTemplateByTemplateId)
  .put(timetableController.updateTemplateById)
  .delete(timetableController.deleteTemplateById);

router
  .route("/class")
  .get(timetableController.getTemplates)
  .post(timetableController.addTemplate);

module.exports = router;
