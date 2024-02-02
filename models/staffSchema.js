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
    // createdAt: {
    //   type: Date,
    //   default: Date.now,
    // },
    // updatedAt: {
    //   type: Date,
    //   default: Date.now,
    // },
    refreshToken: {
      type: String,
    },
    accessibleModules: {
      type: Object,
    },
  },
  { timestamps: true }
);

const Staff = mongoose.model("Staff", staffSchema);
module.exports = Staff;
