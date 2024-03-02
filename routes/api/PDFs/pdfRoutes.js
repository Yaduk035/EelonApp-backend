const certificatesController = require("../../../controllers/CertificatesController");
const express = require("express");
const router = express.Router();

router
  .route("/staff/experience/:id")
  .post(certificatesController.addExperiencePdfs);

module.exports = router;
