const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gradeSchema = new Schema(
  {
    schoolId: String,
    studentId: {
      type: String,
    },
    studentName: {
      type: String,
    },
    studentEmail: {
      type: String,
    },
    studentRollNo: {
      type: String,
    },
    subject: {
      type: String,
    },
    dueDate: {
      type: String,
    },
    grade: {
      type: String,
    },
  },
  {timestamps: true}
);

const grades = mongoose.model('grade', gradeSchema);
module.exports = grades;
