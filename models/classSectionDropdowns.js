const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classSectionDropdownSchema = new Schema(
  {
    schoolId: String,
    academicYear: {
      type: Array,
    },
    subjects: {
      type: Array,
    },
    type: {
      type: String,
    },
  },
  {timestamps: true}
);

const classSectionDropdown = mongoose.model('classSectionDropdown', classSectionDropdownSchema);
module.exports = classSectionDropdown;
