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

const libarySettings = new Schema({
  genre: String,
});

const schoolSchema = new Schema(
  {
    schoolIndexNo: String,
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
    status: String,
    contactNo: String,
    email: String,
    hostelRoomTypes: [roomTypes],
    libraryGenre: [libarySettings],
    subjects: Array,
    academicYears: Array,
  },
  {timestamps: true}
);

const school = mongoose.model('SchoolsDb', schoolSchema);
module.exports = school;
