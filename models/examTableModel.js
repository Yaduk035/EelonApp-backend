const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const examArraySchema = new Schema(
  {
    id: {
      type: String,
    },
    subject: { type: String },
    day: {
      type: String,
    },
    periodName: {
      type: String,
    },
    periodNo: {
      type: String,
    },
    teachersName: {
      type: String,
    },
    periodType: {
      type: String,
    },
    timeIn: {
      type: String,
    },
    timeOut: {
      type: String,
    },
  },
  { timestamps: true }
);

const timingArraySchema = new Schema(
  {
    classId: {
      type: Array,
    },
    std: {
      type: String,
    },
    id: {
      type: Number,
    },
    timeIn: {
      type: String,
    },
    timeOut: {
      type: String,
    },
  },
  { timestamps: true }
);

const examTableSchema = new Schema(
  {
    templateId: {
      type: String,
    },
    classType: {
      type: String,
    },
    classId: {
      type: String,
    },
    timeTableArray: [examArraySchema],
    timing: [timingArraySchema],
  },
  { timestamps: true }
);

const examTable = mongoose.model("ExamTimeTable", examTableSchema);
module.exports = examTable;
