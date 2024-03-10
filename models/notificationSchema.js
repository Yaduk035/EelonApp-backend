const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema(
  {
    schoolId: String,
    staffEmail: {
      type: String,
    },
    std: {
      type: String,
    },
    section: {
      type: String,
    },
    subject: {
      type: String,
    },
    message: {
      type: String,
    },
  },
  {timestamps: true}
);

const Notification = mongoose.model('notifications', notificationSchema);
module.exports = Notification;
