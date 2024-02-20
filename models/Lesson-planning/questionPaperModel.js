const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionPaperSchema = new Schema(
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

const questionPaper = mongoose.model("questionPaper", questionPaperSchema);
module.exports = questionPaper;
