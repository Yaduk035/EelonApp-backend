const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const feeTypeSchema = new Schema(
  {
    academicYear: {
      type: String,
    },
    std: {
      type: String,
    },
    type: {
      type: String,
    },
    term: {
      type: String,
    },
    amount: {
      type: Number,
    },
  },
  { timestamps: true }
);

const feeStructure = mongoose.model("feeStructure", feeTypeSchema);
module.exports = feeStructure;
