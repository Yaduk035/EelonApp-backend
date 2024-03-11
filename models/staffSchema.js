const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workExperienceSchema = new Schema({
  schoolId: String,
  jobRole: String,
  jobRoleIn: String,
  expFrom: String,
  expTo: String,
  pdf: {
    public_id: String,
    url: String,
  },
});

const educationSchema = new Schema({
  schoolId: String,
  qualification: String,
  uni: String,
  expFrom: String,
  expTo: String,
  pdf: {
    public_id: String,
    url: String,
  },
});

const staffSchema = new Schema(
  {
    name: {
      type: String,
    },
    userName: {
      type: String,
    },
    email: {
      type: String,
    },
    roles: {
      staff: {
        type: Number,
        default: 5151,
      },
    },
    password: {
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

    refreshToken: {
      type: String,
    },
    accessibleModules: {
      type: Object,
    },
    classRooms: {
      type: Array,
    },
    gender: String,
    maritalStatus: String,
    religion: String,
    jobType: String,
    jobRole: String,
    accType: String,
    userType: String,
    staffId: String,
    mob: String,
    mob2: String,
    wamob: String,
    contactEmail: String,
    DOB: String,
    DOJ: String,
    aadharNo: String,
    pan: String,
    nationality: String,
    state: String,
    city: String,
    pib: String,
    address: String,
    bankAccountNumber: String,
    bankAccountName: String,
    bankName: String,
    bankBranchName: String,
    bankIFSCcode: String,
    otherBankdetails: String,
    baseSalary: Number,
    pf: String,
    epfno: String,
    esi: String,
    otherAllowance: String,
    workExperienceArray: [workExperienceSchema],
    educationArray: [educationSchema],
    hostelRoomNo: Number,
    hostelRoomType: String,
    hosterlRoomObjId: String,
  },
  {timestamps: true}
);

const Staff = mongoose.model('Staff', staffSchema);
module.exports = Staff;
