const express = require("express");
const router = express.Router();
const marksController = require("../../controllers/marksController");

router.route("/exam/filter/subwise").put(marksController.filterMarksSubwise);
router
  .route("/exam/filter/classwise")
  .put(marksController.filterMarksClasswise);

router
  .route("/exam")
  .post(marksController.addMarks)
  .get(marksController.getAllMarks);

router
  .route("/exam/:id")
  .put(marksController.updateMarks)
  .get(marksController.getMarksById)
  .delete(marksController.deleteMarks);

module.exports = router;
