const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const occupantsArr = new Schema({
  schoolId: String,
  occupantName: String,
  occupantId: String,
  occupantType: String,
  fromDate: String,
  toDate: String,
  addedBy: String,
});

const hostelRoomSchema = new Schema(
  {
    type: String,
    occupantsNo: Number,
    rentPerMonth: Number,
    rentPerWeek: Number,
    rentPerDay: Number,
    occupantsArray: [occupantsArr],
  },
  {timestamps: true}
);

const rooms = mongoose.model('hostel-rooms', hostelRoomSchema);
module.exports = rooms;
