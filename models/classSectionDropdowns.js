const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const classSectionDropdownSchema = new Schema(
  {
    settingType: {
      type: String,
    },
    genre: {
      type: String,
    },
  },
  { timestamps: true }
);

const classSectionDropdown = mongoose.model(
  "classSectionDropdown",
  classSectionDropdownSchema
);
module.exports = classSectionDropdown;
