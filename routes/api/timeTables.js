const express = require('express');
const router = express.Router();
const timetableController = require('../../controllers/timetableController');
const examtableController = require('../../controllers/examTimetableController');

// router
//   .route("/class/template/editarray/:id")
//   .put(timetableController.addTimetableToArray)
//   .delete(timetableController.deleteTimetableFromArray);

// router
//   .route("/class/template/dropdowns")
//   .get(timetableController.getTemplateDropdowns);

// router
//   .route("/class/template/:id")
//   .get(timetableController.getTemplateByTemplateId)
//   .put(timetableController.updateTemplateById)
//   .delete(timetableController.deleteTemplateById);

router.route('/classwise/classid/:id').get(timetableController.getClasswiseTimetableByClassId);

router.route('/classwise/filter').put(timetableController.filterTimetables);

router.route('/classwise').post(timetableController.addClasswiseTimetable).get(timetableController.getAllTimetables);

router
  .route('/classwise/:id')
  .put(timetableController.updateClasswiseTimetable)
  .get(timetableController.getClasswiseTimetable)
  .delete(timetableController.deleteClasswiseTimetable);

// router
//   .route("/class/template")
//   .get(timetableController.getTemplates)
//   .post(timetableController.addTemplate);

router.route('/exam/filter').put(examtableController.filterExamTimetables);

router.route('/exam').post(examtableController.addTimetable).get(examtableController.getAllExamTimetables);

router.route('/exam/classwise/:id').get(examtableController.getExamTimetableByClassId);

router.route('/exam/:id').delete(examtableController.deleteExamTimetableById);

module.exports = router;
