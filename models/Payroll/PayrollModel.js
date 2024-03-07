const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const payrollSchema = new Schema(
  {
    staffId: String,
    staffRole: String,
    staffType: String,
    adminDbId: String,
    schoolDbId: String,
    month: String,
    academicYear: String,
    dateIssued: String,
    baseSalary: Number,
    baseSalaryStatus: String,
    incrementType: String,
    increment: Number,
    incrementAmount: Number,
    incrementStatus: String,
    incentiveType: String,
    incentive: Number,
    incentiveAmount: Number,
    incentiveStatus: String,
    remunerationType: String,
    remuneration: Number,
    remunerationAmount: Number,
    remunerationStatus: String,
    bonusType: String,
    bonus: Number,
    bonusAmount: Number,
    bonusStatus: String,
    fineType: String,
    fine: Number,
    fineAmount: Number,
    fineStatus: String,
    total: Number,
  },
  {timestamps: true}
);
const pay = mongoose.model('payRoll', payrollSchema);
module.exports = pay;
