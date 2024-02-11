const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const attendanceStudentSchema = new Schema(
  {
    studentName: {
      type: String,
    },
    studentId: {
      type: String,
    },
    rollNo: {
      type: String,
    },
    isPresent: {
      type: String,
    },
    reason: {
      type: Object,
    },
  },
  { timestamps: true }
);

const attendanceSchema = new Schema(
  {
    classObjId: String,
    classId: String,
    std: String,
    section: String,
    board: String,
    date: String,
    attendance: [attendanceStudentSchema],
  },
  { timestamps: true }
);

const attendance = mongoose.model("attendance", attendanceSchema);
module.exports = attendance;
