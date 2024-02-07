const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const assignmentsSchema = new Schema(
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

const assignments = mongoose.model("assignmentsCollection", assignmentsSchema);
module.exports = assignments;
