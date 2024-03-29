const studentModel = require("../models/studentSchema");
const staffModel = require("../models/staffSchema");
const libraryModel = require("../models/BookSchema");
const xlsx = require("xlsx");
const bcrypt = require("bcrypt");

const addStudents = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file was uploaded" });
    }
    const file = req.file;
    const workbook = xlsx.read(file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(sheet);

    let hashedPWdArray = await Promise.all(
      jsonData.map(async (item) => {
        if (item?.password) {
          const hashedPwd = await bcrypt.hash(item?.password, 10);
          const reqData = {
            ...item,
            password: hashedPwd,
          };
          return reqData;
        } else {
          return item;
        }
      })
    );

    const result = await studentModel.insertMany(hashedPWdArray);
    if (!result)
      return res
        .status(400)
        .json({ message: "Error adding data", success: false });
    res.status(201).json(result);
    // res.status(201).json(hashedPWdArray);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

const addStaff = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file was uploaded" });
    }
    const file = req.file;
    const workbook = xlsx.read(file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(sheet);

    let hashedPWdArray = await Promise.all(
      jsonData.map(async (item) => {
        if (item?.password) {
          const hashedPwd = await bcrypt.hash(item?.password, 10);
          const reqData = {
            ...item,
            password: hashedPwd,
          };
          return reqData;
        } else {
          return item;
        }
      })
    );

    const result = await staffModel.insertMany(hashedPWdArray);
    if (!result)
      return res
        .status(400)
        .json({ message: "Error adding data", success: false });
    res.status(201).json(result);
    // res.status(201).json(hashedPWdArray);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

const addBooks = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file was uploaded" });
    }
    const file = req.file;
    const workbook = xlsx.read(file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(sheet);

    const result = await libraryModel.insertMany(jsonData);
    if (!result)
      return res
        .status(400)
        .json({ message: "Error adding data", success: false });
    res.status(201).json(result);
    // res.status(201).json(hashedPWdArray);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

module.exports = { addStudents, addStaff, addBooks };
