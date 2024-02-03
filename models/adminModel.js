const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema(
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
      admin: {
        type: Number,
        default: 2000,
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
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
