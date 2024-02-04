const express = require("express");
const router = express.Router();
const refreshTokenController = require("../../controllers/refreshTokenController");

router.route("/student").get(refreshTokenController.handleStudentRefreshToken);
router.route("/staff").get(refreshTokenController.handleStudentRefreshToken);
router.route("/admin").get(refreshTokenController.handleStudentRefreshToken);

module.exports = router;
