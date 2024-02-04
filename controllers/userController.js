const Admin = require("../models/adminModel");
const Staff = require("../models/staffSchema");
const StudentSchema = require("../models/studentSchema");

const getUsers = async (req, res) => {
  try {
    const users = await Staff.find().exec();
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

const addAdmin = async (req, res) => {
  try {
    const userData = req.body;
    if (!userData)
      return res.status(400).json({
        message: "Username and password must not be empty",
        success: false,
      });
    const duplicateUser = await Admin.findOne({ email: userData.email }).exec();
    if (duplicateUser)
      return res
        .status(409)
        .json({ message: "Username already exists", success: false });
    const results = await Admin.create(userData);
    console.log(results);
    res.status(201).json({ message: "Admin created", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await Staff.findByIdAndDelete(id);
    if (!user)
      return res
        .status(204)
        .json({ message: `User with id ${id} deleted`, success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

/////////////////////////////////////////////////////////

const addStaff = async (req, res) => {
  try {
    const userData = req.body;
    if (!userData)
      return res.status(400).json({
        message: "Username and password must not be empty",
        success: false,
      });
    const duplicateUser = await Staff.findOne({ email: userData.email }).exec();
    if (duplicateUser)
      return res
        .status(409)
        .json({ message: "Username already exists", success: false });
    const results = await Staff.create(userData);
    console.log(results);
    res.status(201).json({ message: "Staff created", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

const deleteStaff = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await Staff.findByIdAndDelete(id);
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
    // if (duplicateUser)
    //   return res
    //     .status(409)
    //     .json({ message: "Student email already exists", success: false });
    const results = await StudentSchema.create(userData);
    console.log(results);
    res.status(201).json({ message: "Student created", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

const updateStudent = async (req, res) => {
  try {
    if (!req.params.id) return res.status(400).json({ message: "No id sent" });
    const data = req.body;
    if (!data) return res.status(400).json({ message: "No data sent" });
    const studentData = await StudentSchema.findByIdAndUpdate(
      req.params.id,
      data
    );
    if (!studentData)
      return res
        .status(404)
        .json({ message: `User with id${req.params.id} not found` });
    res.status(201).json(studentData);
  } catch (error) {
    console.log(error);
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
    res.status(201).json({ message: `Student with id ${id} deleted` });
  } catch (error) {
    console.log(error);
  }
};

const getStudentByName = async (req, res) => {
  try {
    if (!req.params.id)
      return res
        .status(400)
        .json({ message: "No student name sent as params" });
    const users = await StudentSchema.find({
      $or: [
        { email: { $regex: new RegExp(req.params.id, "i") } },
        { studentName: { $regex: new RegExp(req.params.id, "i") } },
      ],
    });
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

const getStudentById = async (req, res) => {
  try {
    if (!req.params.id)
      return res
        .status(400)
        .json({ message: "No student name sent as params" });
    const users = await StudentSchema.findById(req.params.id);
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

const getStudentByNameIssueLib = async (req, res) => {
  try {
    if (!req.params.id)
      return res
        .status(400)
        .json({ message: "No student name sent as params" });
    const users = await StudentSchema.findOne({
      $or: [{ email: req.params.id }],
    });
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

const issueLibCard = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    if (!data) return res.status(400).json({ message: "No info sent" });
    const user = await StudentSchema.findByIdAndUpdate(id, data);
    if (!user) return res.status(404).json({ message: "No user found" });
    res
      .status(201)
      .json({ message: `User with id ${id} successfully updated` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getUsers,
  addStaff,
  deleteStaff,
  getStudents,
  addStudent,
  deleteStudent,
  addAdmin,
  deleteAdmin,
  getStudentByName,
  issueLibCard,
  getStudentByNameIssueLib,
  getStudentById,
  updateStudent,
};
