const express = require("express");
const router = express.Router();
const classSectionController = require("../../controllers/classSectionController");

router.route("/").post(classSectionController.addClass);

router.route("/:id").delete(classSectionController.deleteClass);

module.exports = router;
