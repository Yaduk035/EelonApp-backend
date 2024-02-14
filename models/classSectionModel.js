const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const classSchema = new Schema(
  {
    std: {
      type: String,
    },
    section: {
      type: String,
    },
    classId: {
      type: String,
    },
    students: {
      type: Array,
    },
    teachers: {
      type: Array,
    },
    attendanceDbId: {
      type: String,
    },
    academicYear: {
      type: String,
    },
    examDbId: {
      type: String,
    },
    announcementDbId: {
      type: String,
    },
  },
  { timestamps: true }
);

const classSection = mongoose.model("class-section", classSchema);
module.exports = classSection;
