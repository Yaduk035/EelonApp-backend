const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const syllabusSchema = new Schema(
  {
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
    syllabusPdf: {
      type: String,
    },
    status: {
      type: String,
      default: "Pending",
    },
  },
  { timestamps: true }
);

const syllabus = mongoose.model("syllabusDb", syllabusSchema);
module.exports = syllabus;
