const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const syllabusSchema = new Schema(
  {
    schoolId: String,
    year: {
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
    termName: {
      type: String,
    },
    pdf: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    status: {
      type: String,
      default: 'Pending',
    },
    remarks: {
      type: String,
    },
  },
  {timestamps: true}
);

const syllabus = mongoose.model('syllabusDb', syllabusSchema);
module.exports = syllabus;
