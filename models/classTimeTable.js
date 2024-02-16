const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const periodArraySchema = new Schema(
  {
    periodName: {
      type: String,
    },
    periodNo: {
      type: String,
    },
    tutorName: {
      type: String,
    },
    periodType: {
      type: String,
    },
  },
  { timestamps: true }
);

const timeTableSchema = new Schema(
  {
    day: {
      type: String,
    },
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
  },
  { timestamps: true }
);

const timeTable = mongoose.model("TimeTable", timeTableSchema);
module.exports = timeTable;
