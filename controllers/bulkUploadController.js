const studentModel = require("../models/studentSchema");
const xlsx = require("xlsx");

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

    const result = await studentModel.insertMany(jsonData);
    if (!result)
      return res
        .status(400)
        .json({ message: "Error adding data", success: false });
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

module.exports = { addStudents };
