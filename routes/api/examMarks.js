const express = require("express");
const router = express.Router();
const marksController = require("../../controllers/marksController");

router.route("/exam/filter").put(marksController.filterMarks);

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
