const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const libraryDropdownSchema = new Schema(
  {
    schoolId: String,
    settingType: {
      type: String,
    },
    genre: {
      type: String,
    },
  },
  {timestamps: true}
);

const libraryDropdown = mongoose.model('libraryDropdown', libraryDropdownSchema);
module.exports = libraryDropdown;
