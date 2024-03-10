const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gradeBookSchema = new Schema(
  {
    schoolId: String,
    term: String,
    academicYear: String,
    teacherId: String,
    studyRoomId: String,
    bookName: String,
    description: String,
    subject: String,
    std: String,
    coverPage: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    pdf: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  },
  {timestamps: true}
);

const gBooks = mongoose.model('gradeBooks', gradeBookSchema);
module.exports = gBooks;
