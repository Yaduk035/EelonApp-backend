const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QBSchema = new Schema(
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
    remarks: {
      type: String,
    },
  },
  { timestamps: true }
);

const questionBank = mongoose.model("questionBank", QBSchema);
module.exports = questionBank;
