const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const feesArr = new Schema({
  feeType: String,
  accountsDbId: String,
  receiptNo: String,
  invoiceNo: Number,
});

const feeCollectionSchema = new Schema(
  {
    academicYear: {
      type: String,
    },
    studentId: String,
    studentName: String,
    billDate: String,
    invoiceNo: Number,
    address: String,
    admnNo: String,
    classSection: String,
    feesArray: Array,
  },
  { timestamps: true }
);

const feeCollection = mongoose.model("feeCollection", feeCollectionSchema);
module.exports = feeCollection;
