const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subjects = new Schema(
  {
    schoolId: String,
    art_craft: String,
    mentalAttitudes: String,
    activitiesLs: String,
    physicalExcs: String,
    lifeSkills: String,
    studentName: String,
    studentId: String,
    rollNo: Number,
  },
  {timestamps: true}
);

const scholasticSchema = new Schema(
  {
    schoolId: String,
    classSection: {
      type: String,
    },
    academicYear: {
      type: String,
    },
    teacherName: {
      type: String,
    },
    teacherId: {
      type: String,
    },
    std: {
      type: String,
    },
    examType: {
      type: String,
    },
    term: {
      type: String,
    },
    marksArray: [subjects],
  },
  {timestamps: true}
);

const scholasticMarks = mongoose.model('ScholasticMarks', scholasticSchema);
module.exports = scholasticMarks;
