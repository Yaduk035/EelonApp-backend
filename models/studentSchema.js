const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema(
  {
    studentName: {
      type: String,
    },
    admnNo: {
      type: Number,
    },
    rollNo: {
      type: Number,
    },
    nameTamil: {
      type: String,
    },
    roles: {
      student: {
        type: Number,
        default: 999,
      },
    },
    DOB: {
      type: String,
    },
    gender: {
      type: String,
    },
    studentPhoto: {
      type: String,
    },
    AadharNo: {
      type: Number,
    },
    ContactNo: {
      type: Number,
    },
    AltCnctNo: {
      type: Number,
    },
    weight: {
      type: Number,
    },
    height: {
      type: Number,
    },
    std: {
      type: String,
    },
    section: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    bloodGp: {
      type: String,
    },
    motherTongue: {
      type: String,
    },
    religion: {
      type: String,
    },
    caste: {
      type: String,
    },
    subCaste: {
      type: String,
    },
    community: {
      type: String,
    },
    address: {
      type: String,
    },
    state: {
      type: String,
    },
    city: {
      type: String,
    },
    pincode: {
      type: Number,
    },
    dateOfJoin: {
      type: String,
    },
    classOfJoin: {
      type: String,
    },
    EMSno: {
      type: Number,
    },
    nationality: {
      type: String,
    },
    mediumOfInstruction: {
      type: String,
    },
    concessionStudent: {
      type: Boolean,
    },
    academicYear: {
      type: String,
    },
    studentCategory: {
      type: String,
    },
    studentGp: {
      type: String,
    },
    cerficate: {
      type: String,
    },
    FathersName: {
      type: String,
    },
    FathersNameTamil: {
      type: String,
    },
    FathersJob: {
      type: String,
    },
    FathersPhoto: {
      type: String,
    },
    MothersName: {
      type: String,
    },
    MothersNameTamil: {
      type: String,
    },
    MothersJob: {
      type: String,
    },
    MothersPhoto: {
      type: String,
    },
    guardianName: {
      type: String,
    },
    guardianNameTamil: {
      type: String,
    },
    guardiansJob: {
      type: String,
    },
    annualIncome: {
      type: String,
    },
    libCardStatus: {
      type: Boolean,
    },
    libCardNo: {
      type: Number,
    },
    booksIssued: {
      type: Array,
    },
    booksIssued: {
      type: Array,
    },
    refreshToken: String,
  },
  { timestamps: true }
);

const student = mongoose.model("studentSchema", studentSchema);
module.exports = student;