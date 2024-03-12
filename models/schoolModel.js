const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomTypes = new Schema({
  schoolId: String,
  type: String,
  occupantsNo: Number,
  rentPerMonth: Number,
  rentPerWeek: Number,
  rentPerDay: Number,
});

const schoolSchema = new Schema(
  {
    schoolId: String,
    shoolName: String,
    address: String,
    admin: Array,
    schooBanner: {
      public_id: String,
      url: String,
    },
    startDate: String,
    endDate: String,
    hostelName: String,
    hostelRoomNo: Number,
    hostelRoomTypes: [roomTypes],
    status: String,
    contactNo: String,
    email: String,
  },
  {timestamps: true}
);

const school = mongoose.model('SchoolsDb', schoolSchema);
module.exports = school;
