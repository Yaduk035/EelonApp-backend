const express = require("express");
const router = express.Router();
const marksController = require("../../controllers/marksController");

//////////// 'marks/*'  ////////////
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

////////////   get all subjects from a exam collection   /////////////
router.route("/exam/subs").put(marksController.getAllSubjects);

router
  .route("/exam")
  .post(marksController.addMarks)
  .get(marksController.getAllMarks);

router
  .route("/exam/:id")
  .put(marksController.updateMarks)
  .get(marksController.getMarksById)
  .delete(marksController.deleteMarks);

//////////////  Co-Scholastic  //////////////

router
  .route("/scholastic/filter/classwise")
  .put(marksController.filterScholasticMarksClasswise);
router
  .route("/scholastic/filter/studentwise/:id")
  .put(marksController.filterScholasticMarksStudentwise);

router
  .route("/scholastic")
  .post(marksController.addScholasticMarks)
  .get(marksController.getAllScholasticMarks);

router
  .route("/scholastic/:id")
  .put(marksController.updateScholasticMarks)
  .get(marksController.getScholasticMarksById)
  .delete(marksController.deleteScholasticMarks);

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

////////////////////////////////////////////////

module.exports = router;
