const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contentArray = new Schema(
  {
    schoolId: String,
    title: String,
    description: String,
    contentType: String,
    pdf: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    ppt: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    link: String,
  },
  {timestamps: true}
);

const syllabusSchema = new Schema(
  {
    schoolId: String,
    term: String,
    month: String,
    week: String,
    academicYear: String,
    teacherId: String,
    studyRoomId: String,
    subject: String,
    std: String,
    unitName: String,
    description: String,
    pageNo: String,
    contents: [contentArray],
  },
  {timestamps: true}
);

const syllabus = mongoose.model('syllabus', syllabusSchema);
module.exports = syllabus;
