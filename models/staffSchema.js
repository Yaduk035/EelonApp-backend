const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const staffSchema = new Schema(
  {
    name: {
      type: String,
    },
    userName: {
      type: String,
    },
    email: {
      type: String,
    },
    roles: {
      staff: {
        type: Number,
        default: 5151,
      },
    },
    password: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
    accessibleModules: {
      type: Object,
    },
    classRooms: {
      type: Array,
    },
  },
  { timestamps: true }
);

const Staff = mongoose.model("Staff", staffSchema);
module.exports = Staff;
