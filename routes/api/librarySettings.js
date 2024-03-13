const express = require('express');
const router = express.Router();
const librarySettingsController = require('../../controllers/LibrarySettingsController');

router
  .route('/')
  .post(librarySettingsController.AddGenreDropdown)
  .get(librarySettingsController.getAllGenreDropdown)
  .put(librarySettingsController.getGenreDropdown)
  .delete(librarySettingsController.deleteGenre);

module.exports = router;
