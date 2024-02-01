const express = require("express");
const router = express.Router();
const authController = require("../../controllers/authController");

router.post("/admin", authController.handleAdminLogin);
router.post("/staff", authController.handleStaffLogin);
router.post("/student", authController.handleStudentLogin);

module.exports = router;
