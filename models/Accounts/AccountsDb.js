const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExamFeeArray = new Schema(
  {
    term: String,
    academicYear: String,
    feeAmount: Number,
    feeType: String,
    classSection: String,
    std: String,
    date: String,
    description: String,
    templateId: String,
    studentId: String,
    admnId: String,
    recieptNo: String,
    invoiceNo: Number,

    studentName: String,
    modeOfPay: String,
    transactionId: String,
    status: String,
    board: String,
  },
  { timestamps: true }
);

const competitionFeeArray = new Schema(
  {
    title: String,
    description: String,
    feeAmount: Number,
    date: String,
    academicYear: String,
    classSection: String,
    std: String,
    templateId: String,
    studentId: String,
    admnId: String,
    recieptNo: String,
    invoiceNo: Number,

    studentName: String,
    modeOfPay: String,
    transactionId: String,
    status: String,
    board: String,
  },
  { timestamps: true }
);

const eventFeeArray = new Schema(
  {
    title: String,
    description: String,
    feeAmount: Number,
    date: String,
    academicYear: String,
    classSection: String,
    std: String,
    templateId: String,
    studentId: String,
    admnId: String,
    recieptNo: String,
    invoiceNo: Number,

    studentName: String,
    modeOfPay: String,
    transactionId: String,
    status: String,
    board: String,
  },
  { timestamps: true }
);

const annualDayFeeArray = new Schema(
  {
    title: String,
    description: String,
    feeAmount: Number,
    date: String,
    academicYear: String,
    classSection: String,
    std: String,
    templateId: String,
    studentId: String,
    admnId: String,
    recieptNo: String,
    invoiceNo: Number,

    studentName: String,
    modeOfPay: String,
    transactionId: String,
    status: String,
    board: String,
  },
  { timestamps: true }
);

const tourFeeArray = new Schema(
  {
    title: String,
    description: String,
    feeAmount: Number,
    date: String,
    academicYear: String,
    classSection: String,
    std: String,
    templateId: String,
    studentId: String,
    admnId: String,
    recieptNo: String,
    invoiceNo: Number,

    studentName: String,
    modeOfPay: String,
    transactionId: String,
    status: String,
    board: String,
  },
  { timestamps: true }
);

const finesArray = new Schema(
  {
    title: String,
    description: String,
    fineType: String,
    feeAmount: Number,
    date: String,
    academicYear: String,
    classSection: String,
    std: String,
    templateId: String,
    studentId: String,
    admnId: String,
    recieptNo: String,
    invoiceNo: Number,

    studentName: String,
    modeOfPay: String,
    transactionId: String,
    status: String,
    board: String,
  },
  { timestamps: true }
);

const otherFeesArray = new Schema(
  {
    type: String,
    feeType: String,
    title: String,
    description: String,
    fineType: String,
    feeAmount: Number,
    date: String,
    academicYear: String,
    classSection: String,
    std: String,
    templateId: String,
    studentId: String,
    admnId: String,
    recieptNo: String,
    invoiceNo: Number,

    studentName: String,
    modeOfPay: String,
    transactionId: String,
    status: String,
    board: String,
  },
  { timestamps: true }
);

const academicFeesArray = new Schema(
  {
    type: String,
    feeType: String,
    title: String,
    description: String,
    feeAmount: Number,
    date: String,
    academicYear: String,
    classSection: String,
    std: String,
    templateId: String,
    studentId: String,
    admnId: String,
    recieptNo: String,
    invoiceNo: Number,

    studentName: String,
    modeOfPay: String,
    transactionId: String,
    status: String,
    board: String,
    installmentType: String,
    feeInterval: String,
  },
  { timestamps: true }
);

const feeConcessionArray = new Schema(
  {
    type: String,
    feeType: String,
    concessionName: String,
    description: String,
    feeAmount: Number,
    date: String,
    academicYear: String,
    classSection: String,
    std: String,
    templateId: String,
    studentId: String,
    admnId: String,
    recieptNo: String,
    invoiceNo: Number,

    studentName: String,
    status: String,
    reductionType: String,
    reductionAmount: Number,
    reductionPercentage: Number,
    concessionReason: String,
  },
  { timestamps: true }
);

const accountsSchema = new Schema(
  {
    classSection: String,
    academicYear: String,
    std: String,
    studentName: String,
    studentId: String,
    admnId: String,
    admsnDbId: String,
    rollNo: Number,
    board: String,
    totalAmountPaid: Number,
    debt: Number,

    admissionFees: {
      studentId: String,
      admnId: String,
      studentName: String,
      modeOfPay: String,
      transactionId: String,
      amount: Number,
      status: String,
      std: String,
      board: String,
      recieptNo: String,
      invoiceNo: Number,

      academicYear: String,
      admnNo: Number,
      date: String,
      payStatus: {
        type: "String",
        default: "NotPaid",
      },
    },
    AcademicFee: [academicFeesArray],
    examfees: [ExamFeeArray],
    T_C: Object,
    transport: Object,
    hostel: Object,
    competition: [competitionFeeArray],
    events: [eventFeeArray],
    annualDay: [annualDayFeeArray],
    tour: [tourFeeArray],
    fine: [finesArray],
    otherFee: [otherFeesArray],
    feeConcessions: [feeConcessionArray],
  },
  { timestamps: true }
);

const accounts = mongoose.model("AccountsDb", accountsSchema);
module.exports = accounts;
