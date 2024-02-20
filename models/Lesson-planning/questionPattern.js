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
      type: String,
    },
    status: {
      type: String,
      default: "Pending",
    },
  },
  { timestamps: true }
);

const questionPattern = mongoose.model(
  "questionPattern",
  questionPatternSchema
);
module.exports = questionPattern;
