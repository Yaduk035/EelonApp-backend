const express = require("express");
const router = express.Router();
const librarySettingsController = require("../../controllers/LibrarySettingsController");

router
  .route("/:id")
  .put(librarySettingsController.updateGenreDropdown)
  .delete(librarySettingsController.deleteGenre);
router
  .route("/")
  .post(librarySettingsController.AddGenreDropdown)
  .get(librarySettingsController.getGenreDropdown);

module.exports = router;
