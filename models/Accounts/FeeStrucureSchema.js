const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const feeTypeSchema = new Schema(
  {
    academicYear: {
      type: Array,
    },
    std: {
      type: Array,
    },
    type: {
      type: String,
    },
    term: {
      type: String,
    },
    amount: {
      type: String,
    },
  },
  { timestamps: true }
);

const feeStructure = mongoose.model("feeStructure", feeTypeSchema);
module.exports = feeStructure;
