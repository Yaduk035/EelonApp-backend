const attendanceModel = require("../models/attendanceModel");

const addAttendance = async (req, res) => {
  try {
    const attendanceData = req.body;
    if (!body)
      return res
        .status(400)
        .json({ message: "No data sent with body", success: false });
    const attendance = await attendanceModel.create(attendanceData);
    res.status(201).json(attendance);
  } catch (error) {
    console.log(error);
  }
};

const deleteAttendance = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) return res.status();
    const attendance = await attendanceModel.findByIdAndDelete(id);
    if (!attendance)
      return res
        .status(400)
        .json({ message: "Error deleting attendance", success: false });
    res.status(200).json({ message: "Attendance deleted" });
  } catch (error) {
    console.log(error);
  }
};

const getAllAttendance = async (req, res) => {
  try {
    const attendance = await attendanceModel.find().exec();
    if (!attendance)
      return res
        .status(404)
        .json({ message: "No attendance data found", success: false });
    res.status(200).json(attendance);
  } catch (error) {
    console.log(error);
  }
};

const getClasswiseAttendance = async (req, res) => {
  try {
    const attendance = await attendanceModel
      .findOne({ classId: req.params.id })
      .exec();
    if (!attendance)
      return res
        .status(404)
        .json({ message: "No attendance data found", success: false });
    res.status(200).json(attendance);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addAttendance,
  deleteAttendance,
  getAllAttendance,
  getClasswiseAttendance,
};
