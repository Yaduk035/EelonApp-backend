const syllabusController = require('../../controllers/Syllabus&gradeBooks/syllabusController');
const express = require('express');
const router = express.Router();

/////////////   'classmaterials/*'   /////////
router.route('/syllabus/contents/:id').post(syllabusController.addSyllabusContent).delete(syllabusController.removeSyllabusContent);

router.route('/syllabus').get(syllabusController.getAllSyllabus).post(syllabusController.addSyllabus);

router.route('/syllabus/:id').get(syllabusController.getSyllabus).put(syllabusController.updateSyllabus).delete(syllabusController.deleteSyllabus);

module.exports = router;
