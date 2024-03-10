const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subjects = new Schema(
  {schoolId: String, subject: String, studentName: String, studentId: String, internal: Number, external: Number, total: Number, rollNo: Number},
  {timestamps: true}
);

const marksSchema = new Schema(
  {
    schoolId: String,
    classSection: {
      type: String,
    },
    academicYear: {
      type: String,
    },
    teacherName: {
      type: String,
    },
    teacherId: {
      type: String,
    },
    subject: {
      type: String,
    },
    std: {
      type: String,
    },
    examType: {
      type: String,
    },
    term: {
      type: String,
    },
    marksArray: [subjects],
  },
  {timestamps: true}
);

const examMarks = mongoose.model('ExamMarks', marksSchema);
module.exports = examMarks;
