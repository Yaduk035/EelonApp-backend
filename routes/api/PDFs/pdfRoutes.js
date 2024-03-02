const certificatesController = require("../../../controllers/CertificatesController");
const express = require("express");
const router = express.Router();

router
  .route("/staff/experience/:id")
  .post(certificatesController.addExperiencePdfs)
  .delete(certificatesController.deleteWorkExpPdf);

router
  .route("/staff/education/:id")
  .post(certificatesController.addEducationPdfs)
  .delete(certificatesController.deleteEducationPdf);

module.exports = router;
