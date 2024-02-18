const ClassTimetableTemplate = require("../models/classTimeTableTemplate");
const ClassTimetable = require("../models/classTimeTable");

//////////////////////////////////////////////////////////////

const addClasswiseTimetable = async (req, res) => {
  try {
    const data = req.body;
    if (!data) return res.status(400).json({ message: "No data sent" });
    const duplicateEntry = await ClassTimetable.findOne({
      classId: data?.classId,
    });
    if (duplicateEntry)
      return res
        .status(409)
        .json({ message: "Timetable for the class already exists" });
    const timeTable = await ClassTimetable.create(data);
    if (!timeTable)
      return res.status(400).json({ message: "Error adding timetable" });
    res.status(201).json(timeTable);
  } catch (error) {
    console.error(error);
  }
};

const updateClasswiseTimetable = async (req, res) => {
  try {
    const data = req.body;
    if (!data) return res.status(400).json({ message: "No data sent" });
    const timeTable = await ClassTimetable.findByIdAndUpdate(
      req.params.id,
      data
    );
    if (!timeTable)
      return res.status(400).json({ message: "Error adding timetable" });
    res.status(201).json(timeTable);
  } catch (error) {
    console.error(error);
  }
};

const getAllTimetables = async (req, res) => {
  try {
    const timeTable = await ClassTimetable.find().exec();
    if (!timeTable)
      return res.status(400).json({ message: "No timetables found" });
    res.status(201).json(timeTable);
  } catch (error) {
    console.error(error);
  }
};

const getClasswiseTimetable = async (req, res) => {
  try {
    const timeTable = await ClassTimetable.findById(req.params.id).exec();
    if (!timeTable)
      return res.status(400).json({ message: "No timetables found" });
    res.status(201).json(timeTable);
  } catch (error) {
    console.error(error);
  }
};

const getClasswiseTimetableByClassId = async (req, res) => {
  try {
    const classId = req.params.id;
    const timeTable = await ClassTimetable.findOne({ classId: classId }).exec();
    if (!timeTable)
      return res.status(400).json({ message: "No timetables found" });
    res.status(201).json(timeTable);
  } catch (error) {
    console.error(error);
  }
};

const deleteClasswiseTimetable = async (req, res) => {
  try {
    const timeTable = await ClassTimetable.findByIdAndDelete(req.params.id);
    if (!timeTable)
      return res.status(400).json({ message: "Error adding timetable" });
    res.status(201).json({ message: "Attendance deleted" });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  addClasswiseTimetable,
  updateClasswiseTimetable,
  getAllTimetables,
  getClasswiseTimetable,
  getClasswiseTimetableByClassId,
  deleteClasswiseTimetable,
};
