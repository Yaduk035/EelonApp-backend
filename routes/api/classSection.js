const express = require('express');
const router = express.Router();
const classSectionController = require('../../controllers/classSectionController');

////////'classsection/*' ///////////

router.route('/dropdowns/std').get(classSectionController.getClassDropdowns);
router.route('/dropdowns/').get(classSectionController.getClassSectionDropdowns);
router.route('/dropdowns/manageclass/:id').get(classSectionController.getClassSectionManageClsDD);

router.route('/addstudent/:id').put(classSectionController.addStudentToClass);
router.route('/academicyear').post(classSectionController.postAcademicYear);
router
  .route('/academicyear/:id')
  .put(classSectionController.addAcademicYear)
  .get(classSectionController.getAcademicYearDropdowns)
  .delete(classSectionController.removeAcademicYear);

router
  .route('/subjects/dropdowns')
  .put(classSectionController.addDropdownSubs)
  .get(classSectionController.getSubjectsDropdowns)
  .delete(classSectionController.removeDropdownSub);

router.route('/').post(classSectionController.addClass).get(classSectionController.getAllClasses);

router.route('/:id').delete(classSectionController.deleteClass).put(classSectionController.updateClass).get(classSectionController.getAClassroom);

module.exports = router;
