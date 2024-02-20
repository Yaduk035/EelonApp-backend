const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionPatternSchema = new Schema(
  {
    year: {
      type: String,
    },
    teacherName: {
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
  },
  { timestamps: true }
);

const questionPattern = mongoose.model(
  "questionPattern",
  questionPatternSchema
);
module.exports = questionPattern;