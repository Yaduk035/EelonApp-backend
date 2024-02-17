const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const periodArraySchema = new Schema(
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
    classId: { type: String },
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

const timeTableSchema = new Schema(
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
    timeTableArray: [periodArraySchema],
    timing: [timingArraySchema],
  },
  { timestamps: true }
);

const timeTable = mongoose.model("TimeTable", timeTableSchema);
module.exports = timeTable;
