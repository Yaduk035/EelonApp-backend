const express = require("express");
const router = express.Router();
const marksController = require("../../controllers/marksController");

router.route("/exam/filter/subwise").put(marksController.filterMarksSubwise);
router
  .route("/exam/filter/classwise")
  .put(marksController.filterMarksClasswise);
router
  .route("/exam/filter/classwisetotal")
  .put(marksController.getSubwiseTotalMarks);
router
  .route("/exam/filter/studentwise/:id")
  .put(marksController.filterMarksStudentwise);

router
  .route("/exam")
  .post(marksController.addMarks)
  .get(marksController.getAllMarks);

router
  .route("/exam/:id")
  .put(marksController.updateMarks)
  .get(marksController.getMarksById)
  .delete(marksController.deleteMarks);

/////////////////////////Hall tickets/////////////////////

router.route("/halltickets/filtering").put(marksController.hallticketFiltering);
router
  .route("/halltickets")
  .post(marksController.createClasswiseHalltickets)
  .get(marksController.getAllHalltickets);
router
  .route("/halltickets/:id")
  .put(marksController.addStudentHalltickets)
  .delete(marksController.deleteClasswiseHalltickets);

module.exports = router;
