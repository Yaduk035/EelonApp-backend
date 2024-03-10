const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hallticketArray = new Schema(
  {schoolId: String, studentId: String, rollNo: Number, feeStatus: String, academicYear: String, term: String, approved: Boolean},
  {timestamps: true}
);

const hallticketSchema = new Schema(
  {
    schoolId: String,
    classSection: {
      type: String,
    },
    academicYear: {
      type: String,
    },
    term: {
      type: String,
    },
    halltickets: [hallticketArray],
  },
  {timestamps: true}
);

const halltickets = mongoose.model('halltickets', hallticketSchema);
module.exports = halltickets;
