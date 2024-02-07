const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const classroomSchema = new Schema(
  {
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
    upcoming: {
      type: String,
    },
    subject: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const classroom = mongoose.model("classroom", classroomSchema);
module.exports = classroom;
