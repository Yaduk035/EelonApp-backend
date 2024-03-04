const express = require("express");
const router = express.Router();
const bulkUploadController = require("../../controllers/bulkUploadController");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

router
  .route("/student")
  .post(upload.single("file"), bulkUploadController.addStudents);

module.exports = router;
