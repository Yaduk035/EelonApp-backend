const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classroomSchema = new Schema(
  {
    schoolId: String,
    teachers: {
      type: Array,
    },
    students: {
      type: Array,
    },
    std: {
      type: String,
    },
    section: {
      type: String,
    },
    roomName: {
      type: String,
    },
    roomId: {
      type: String,
    },
    inviteLink: {
      type: String,
    },
    upcomingTasks: {
      type: Array,
    },
    announcements: {
      type: Array,
    },
    assignments: {
      type: Array,
    },
    materials: {
      type: Array,
    },
    grades: {
      type: Array,
    },
    subject: {
      type: String,
    },
    description: {
      type: String,
    },
    createdBy: {
      type: String,
    },
  },
  {timestamps: true}
);

const classroom = mongoose.model('classroom', classroomSchema);
module.exports = classroom;
