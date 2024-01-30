const User = require("../models/user");
const StudentSchema = require("../models/studentSchema");

const getUsers = async (req, res) => {
  try {
    const users = await User.find().exec();
    if (!users)
      return res
        .status(400)
        .json({ message: "No users found.", success: false });
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

const addUser = async (req, res) => {
  try {
    const userData = req.body;
    if (!userData)
      return res.status(400).json({
        message: "Username and password must not be empty",
        success: false,
      });
    const duplicateUser = await User.findOne({ email: userData.email }).exec();
    if (duplicateUser)
      return res
        .status(409)
        .json({ message: "Username already exists", success: false });
    const results = await User.create(userData);
    console.log(results);
    res.status(201).json({ message: "User created", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

const deleteUsers = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndDelete(id);
    if (!user)
      return res
        .status(204)
        .json({ message: `User with id ${id} deleted`, success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

/////////////////////////////////////////////////////////////////////////

const getStudents = async (req, res) => {
  try {
    const users = await StudentSchema.find().exec();
    if (!users)
      return res
        .status(400)
        .json({ message: "No users found.", success: false });
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

const addStudent = async (req, res) => {
  try {
    const userData = req.body;
    const {
      studentName,
      admnNo,
      nameTamil,
      DOB,
      gender,
      studentPhoto,
      AadharNo,
      ContactNo,
      AltCnctNo,
      weight,
      height,
      std,
      section,
      email,
      password,
      bloodGp,
      motherTongue,
      religion,
      caste,
      subCaste,
      community,
      address,
      state,
      city,
      pincode,
      dateOfJoin,
      classOfJoin,
      EMSno,
      nationality,
      mediumOfInstruction,
      concessionStudent,
      academicYear,
      category,
      studentGp,
      cerficate,
      FathersName,
      FathersNameTamil,
      FathersJob,
      FathersPhoto,
      MothersName,
      MothersNameTamil,
      MothersJob,
      MothersPhoto,
      guardianName,
      guardianNameTamil,
      guardiansJob,
      annualIncome,
    } = req.body;
    if (!userData)
      return res.status(400).json({
        message: "Username and password must not be empty",
        success: false,
      });
    const duplicateUser = await StudentSchema.findOne({
      email: userData.email,
    }).exec();
    if (duplicateUser)
      return res
        .status(409)
        .json({ message: "Student email already exists", success: false });
    const results = await StudentSchema.create(userData);
    console.log(results);
    res.status(201).json({ message: "Student created", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

const deleteStudent = async (req, res) => {
  const id = req.params.id;
  if (!id)
    return res.status(400).json({ message: "No id sent", success: false });
  try {
    const user = await StudentSchema.findOneAndDelete(id);
    if (!user)
      return res.status(404).json({ message: `No user with id ${id} found` });
    res.status(201).json({ message: `User with id ${id} deleted` });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getUsers,
  addUser,
  deleteUsers,
  getStudents,
  addStudent,
  deleteStudent,
};
