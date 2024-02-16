const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const attendanceStaffSchema = new Schema(
  {
    staffName: {
      type: String,
    },
    staffId: {
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
    date: String,
    attendance: [attendanceStaffSchema],
  },
  { timestamps: true }
);

const attendance = mongoose.model("staffAttendance", attendanceSchema);
module.exports = attendance;
