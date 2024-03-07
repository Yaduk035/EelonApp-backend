const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const monthPayrollArr = new Schema(
  {
    month: String,
    academicYear: String,
    dateIssued: String,
    basicSalary: Number,
    basicSalaryStatus: String,
    incentiveType: String,
    incentivePercentage: Number,
    incentiveAmount: Number,
    incentiveStatus: String,
    remunerationType: String,
    remunerationPercentage: Number,
    remunerationAmount: Number,
    remunerationStatus: String,
    bonusType: String,
    bonusPercentage: Number,
    bonusAmount: Number,
    bonusStatus: String,
    fineType: String,
    finePercentage: Number,
    fineAmount: Number,
    fineStatus: String,
  },
  { timestamps: true }
);

const payrollSchema = new Schema(
  {
    staffId: String,
    staffRole: String,
    staffType: String,
    baseSalary: Number,
    adminDbId: String,
    schoolDbId: String,
    monthPayroll: [monthPayrollArr],
  },
  { timestamps: true }
);
const pay = mongoose.model("payRoll", payrollSchema);
module.exports = pay;
