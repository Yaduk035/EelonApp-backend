const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema(
  {
    schoolId: String,
    studentName: {
      type: String,
    },
    admnNo: {
      type: Number,
    },
    admnId: {
      type: String,
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
    profilePic: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
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
    classSection: {
      type: String,
    },
    classId: {
      type: String,
    },
    classObjId: {
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
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
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
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
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
    booksIssuedHistory: {
      type: Array,
    },
    refreshToken: String,
    classRooms: {
      type: Array,
    },
    busId: String,
    busNo: String,
    busStop: String,
    transportationType: String,
    hostelRoomNo: Number,
    hostelRoomType: String,
    hostelRoomObjId: String,
  },
  {timestamps: true}
);

const student = mongoose.model('studentSchema', studentSchema);
module.exports = student;
