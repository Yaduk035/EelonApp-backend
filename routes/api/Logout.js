const express = require('express');
const router = express.Router();
const LogoutController = require('../../controllers/LogoutController');

////////  '/logout/*'  ////////

router.route('/admin').get(LogoutController.handleAdminLogout);

router.route('/staff').get(LogoutController.handleStaffLogout);

router.route('/student').get(LogoutController.handleStudentLogout);

router.route('/admin').get(LogoutController.handleSuperAdminLogout);

module.exports = router;
