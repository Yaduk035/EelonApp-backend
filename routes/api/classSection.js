const express = require("express");
const router = express.Router();
const classSectionController = require("../../controllers/classSectionController");

router
  .route("/")
  .post(classSectionController.addClass)
  .get(classSectionController.getAllClasses);

router
  .route("/:id")
  .delete(classSectionController.deleteClass)
  .put(classSectionController.updateClass)
  .get(classSectionController.getAClassroom);

module.exports = router;
