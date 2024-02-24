const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const admissionStdSchema = new Schema(
  {
    studentName: String,
    admnNo: Number,
    applicationNo: Number,
    date: String,
    nameTamil: String,
    roles: {
      student: {
        type: Number,
        default: 999,
      },
    },
    DOB: String,
    gender: String,
    studentProfilePic: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    AadharNo: Number,
    ContactNo: Number,
    AltCnctNo: Number,
    weight: Number,
    height: Number,
    classApplied: String,
    email: String,
    password: String,
    bloodGp: String,
    religion: String,
    caste: String,
    community: String,
    address: String,
    state: String,
    city: String,
    pincode: Number,

    EMISno: Number,
    nationality: String,
    mediumOfInstruction: String,
    academicYear: String,
    FathersName: String,
    FathersNameTamil: String,
    FathersJob: String,
    FathersPhoto: String,
    MothersName: String,
    MothersNameTamil: String,
    MothersJob: String,
    MothersPhoto: String,
    guardianName: String,
    guardianNameTamil: String,
    guardiansJob: String,
    annualIncome: Number,
    monthlyIncome: Number,
    prevSchool: String,
    prevClass: String,
    refName: String,
    refCnctNo: String,
    MarkDetailsPrevClass: String,
    enclosedDoc: String,
    Hostel: Boolean,
  },
  { timestamps: true }
);

const student = mongoose.model("admissionStudentDb", admissionStdSchema);
module.exports = student;
