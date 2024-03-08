const express = require('express');
const router = express.Router();
const syllabusController = require('../../controllers/Syllabus&gradeBooks/syllabusController');
const gradebookController = require('../../controllers/Syllabus&gradeBooks/gradeBookController');

/////////////   'classmaterials/*'   /////////

//////////////   Syllabus  ///////////////
router.route('/syllabus/filter/').put(syllabusController.syllabusFiltering);

router.route('/syllabus/dropdowns/:id').get(syllabusController.syllabusDropdown);

router.route('/syllabus/contents/:id').post(syllabusController.addSyllabusContent).delete(syllabusController.removeSyllabusContent);

router.route('/syllabus').get(syllabusController.getAllSyllabus).post(syllabusController.addSyllabus);

router.route('/syllabus/:id').get(syllabusController.getSyllabus).put(syllabusController.updateSyllabus).delete(syllabusController.deleteSyllabus);

//////////////   Grade book   ////////////////

router.route('/gradebook/filter/').put(gradebookController.gradebookFiltering);

router.route('/gradebook').get(gradebookController.getAllGradebooks).post(gradebookController.addGradebook);

router.route('/gradebook/:id').get(gradebookController.getGradebook).put(gradebookController.updateGradebook).delete(gradebookController.deleteGradebook);

module.exports = router;
