const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const upcomingTasksSchema = new Schema(
  {
    topic: {
      type: String,
    },
    content: {
      type: String,
    },
  },
  { timestamps: true }
);

const upcomingTasks = mongoose.model("upcomingTasks", upcomingTasksSchema);
module.exports = upcomingTasks;
