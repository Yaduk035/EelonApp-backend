const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const concessionSchema = new Schema(
  {
    schoolId: String,
    academicYear: {
      type: String,
    },
    concessionName: String,
    reductionType: String,
    reductionAmount: Number,
    reductionPercentage: Number,
    concessionReason: String,
  },
  {timestamps: true}
);

const concession = mongoose.model('concessionStructure', concessionSchema);
module.exports = concession;
