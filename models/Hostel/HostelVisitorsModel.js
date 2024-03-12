const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hostelVisitorschema = new Schema(
  {
    schoolId: String,
    occupantId: String,
    occupantType: String,
    occupantName: String,
    roomNo: Number,
    roomId: String,
    date: String,
    time: String,
    visitorName: String,
    visitorPhNo: String,
  },
  {timestamps: true}
);

const rooms = mongoose.model('hostel-visitors', hostelVisitorschema);
module.exports = rooms;
