const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const examArraySchema = new Schema(
  {
    id: {
      type: String,
    },
    day: {
      type: String,
    },
    date: {
      type: String,
    },
    ANPortions: {
      type: String,
    },
    ANSub: {
      type: String,
    },
    AnDuty: {
      type: String,
    },
    AnRevDuty: {
      type: String,
    },
    AnRevTopic: {
      type: String,
    },
    FNPortions: {
      type: String,
    },
    FnDuty: {
      type: String,
    },
    FnRevDuty: {
      type: String,
    },
    FnRevTopic: {
      type: String,
    },
    FnSub: {
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
    exam1StartTime: String,
    exam1EndTime: String,
    exam2StartTime: String,
    exam2EndTime: String,
    timeTableArray: [examArraySchema],
  },
  { timestamps: true }
);

const examTable = mongoose.model("ExamTimeTable", examTableSchema);
module.exports = examTable;
