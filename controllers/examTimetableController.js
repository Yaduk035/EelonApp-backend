const examTable = require("../models/examTableModel");

const addTimetable = async (req, res) => {
  try {
    const data = req.body;
    if (!data) return res.status(400).json({ message: "No data sent" });
    const timeTable = await examTable.create(data);
    if (!timeTable)
      return res.status(400).json({ message: "Error adding timetable" });
    res.status(201).json(timeTable);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllExamTimetables = async (req, res) => {
  try {
    const timeTable = await examTable.find().exec();
    if (!timeTable)
      return res.status(400).json({ message: "No timetable found" });
    res.status(200).json(timeTable);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getExamTimetableByClassId = async (req, res) => {
  try {
    const timeTable = await examTable
      .findOne({ classId: req.params.id })
      .exec();
    if (!timeTable)
      return res.status(400).json({ message: "No timetable found" });
    res.status(200).json(timeTable);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteExamTimetableById = async (req, res) => {
  try {
    const timeTable = await examTable.findByIdAndDelete(req.params.id);
    if (!timeTable)
      return res.status(400).json({ message: "No timetable found" });
    res.status(200).json({ message: "timetable deleted", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  addTimetable,
  getAllExamTimetables,
  getExamTimetableByClassId,
  deleteExamTimetableById,
};
