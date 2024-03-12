const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attendanceArray = new Schema(
  {
    index: Number,
    schoolId: String,
    isPresent: String,
    studentName: String,
    studentId: String,
    reason: String,
  },
  {timestamps: true}
);

const hostelRoomSchema = new Schema(
  {
    schoolId: String,
    date: String,
    attendance: [attendanceArray],
  },
  {timestamps: true}
);

const rooms = mongoose.model('hostel-attendance', hostelRoomSchema);
module.exports = rooms;
