const attendanceModel = require("../models/attendanceModel");

const addAttendanceCollection = async (req, res) => {
  try {
    const attendanceData = req.body;
    if (!attendanceData)
      return res
        .status(400)
        .json({ message: "No data sent with body", success: false });
    const attendance = await attendanceModel.create(attendanceData);
    res.status(201).json(attendance);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", success: true });
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
    res.status(500).json({ message: "Server error", success: true });
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
    res.status(500).json({ message: "Server error", success: true });
  }
};

const getAttendanceById = async (req, res) => {
  try {
    const id = req.params.id;
    const attendance = await attendanceModel.findById(id).exec();
    if (!attendance)
      return res
        .status(404)
        .json({ message: "No attendance data found", success: false });
    res.status(200).json(attendance);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", success: true });
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
    res.status(500).json({ message: "Server error", success: true });
  }
};

const addAttendanceToArray = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id)
      return res
        .status(400)
        .json({ message: "No id sent with params", success: false });
    const data = req.body;
    if (!data)
      return res.status(400).json({ message: "No data sent with body" });
    const attendanceData = await attendanceModel.updateOne(
      { _id: id },
      { $push: { attendance: data } }
    );
    res.status(201).json(attendanceData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: true });
  }
};

const deleteAStudentAttendance = async (req, res) => {
  try {
    const attendanceId = req.params.id;
    const { studentId } = req.body;
    if (!studentId)
      return res
        .status(400)
        .json({ message: "No studentId sent with body", success: false });
    const attendance = await attendanceModel.updateOne(
      { _id: attendanceId },
      { $pull: { attendance: { studentId: studentId } } }
    );
    res.status(200).json(attendance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: true });
  }
};

const getAttendanceByStudentId = async (req, res) => {
  try {
    const studentId = req.params.id;

    const aggregationOperation = [
      {
        $match: {
          "attendance.studentId": studentId,
        },
      },
      {
        $project: {
          attendance: {
            $filter: {
              input: "$attendance",
              as: "attendee",
              cond: { $eq: ["$$attendee.studentId", studentId] },
            },
          },
        },
      },
    ];
    const result = await attendanceModel.aggregate(aggregationOperation);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  addAttendanceCollection,
  deleteAttendance,
  getAllAttendance,
  getClasswiseAttendance,
  getAttendanceById,
  addAttendanceToArray,
  deleteAStudentAttendance,
  getAttendanceByStudentId,
};
