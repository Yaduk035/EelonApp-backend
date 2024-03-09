const express = require('express');
const router = express.Router();
const schoolController = require('../../controllers/schoolController');

///////////   '/school/*'  //////////

////////   school  routes  ///////////

router.route('/filter').put(schoolController.schoolFiltering);

router.route('/').get(schoolController.getAllSchools).post(schoolController.addSchool);

router.route('/:id').get(schoolController.getSchool).put(schoolController.updateSchool).delete(schoolController.deleteSchool);

module.exports = router;
