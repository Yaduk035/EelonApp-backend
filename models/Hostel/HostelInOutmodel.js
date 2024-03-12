const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hostelIn_outschema = new Schema(
  {
    schoolId: String,
    occupantId: String,
    occupantType: String,
    occupantName: String,
    roomNo: Number,
    roomId: String,
    date: String,
    inTime: String,
    outTime: String,
  },
  {timestamps: true}
);

const rooms = mongoose.model('hostel_in-out', hostelIn_outschema);
module.exports = rooms;
