const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const assignmentsSchema = new Schema(
  {
    schoolId: String,
    topic: {
      type: String,
    },
    content: {
      type: String,
    },
    link: {
      type: Object,
    },
    studentsTurnedIn: {
      type: Array,
    },
    studentsEnrolled: {
      type: Array,
    },
  },
  {timestamps: true}
);

const assignments = mongoose.model('assignmentsCollection', assignmentsSchema);
module.exports = assignments;
