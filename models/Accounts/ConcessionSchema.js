const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const concessionSchema = new Schema(
  {
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
    concessionName: String,
    reductionType: String,
    reductionAmount: String,
    reductionPercentage: String,
  },
  { timestamps: true }
);

const concession = mongoose.model("concessionStructure", concessionSchema);
module.exports = concession;
