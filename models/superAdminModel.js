const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema(
  {
    schoolId: String,
    name: String,
    email: String,
    password: String,
    roles: {
      superAdmin: {
        type: Number,
        default: 2924,
      },
    },
    refreshToken: String,
  },
  {timestamps: true}
);

const admin = mongoose.model('Super-Admin', adminSchema);
module.exports = admin;
