const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const announcementsSchema = new Schema(
  {
    schoolId: String,
    topic: {
      type: String,
    },
    content: {
      type: String,
    },
  },
  {timestamps: true}
);

const annoucements = mongoose.model('announcementsCollection', announcementsSchema);
module.exports = annoucements;
