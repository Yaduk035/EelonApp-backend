const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const instTermArray = new Schema({
  index: Number,
  amount: Number,
  feeInterval: String,
  feeIntervalType: String,
});

const feeTypeSchema = new Schema(
  {
    schoolId: String,
    academicYear: {
      type: String,
    },
    std: {
      type: String,
    },
    othersType: {
      type: String,
    },
    feeType: {
      type: String,
    },
    term: {
      type: String,
    },
    amount: {
      type: Number,
    },
    installmentArray: [instTermArray],
    concessionName: String,
    reductionType: String,
    reductionAmount: String,
    reductionPercentage: String,
  },
  {timestamps: true}
);

const feeStructure = mongoose.model('feeStructure', feeTypeSchema);
module.exports = feeStructure;
