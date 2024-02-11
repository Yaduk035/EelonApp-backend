const classSectionModel = require("../models/classSectionModel");
const attendanceModel = require("../models/attendanceModel");
const classSection = require("../models/classSectionModel");
const mongoose = require("mongoose");
const { Types } = mongoose;

const addClass = async (req, res) => {
  try {
    const data = req.body;
    const { std, section, classId, attendance } = data;
    if (!data)
      return res
        .status(400)
        .json({ message: "No data sent with body", success: false });
    const attendanceDb = await attendanceModel.create({
      std,
      section,
      classId,
      attendance: [attendance],
    });
    if (!attendanceDb)
      return res
        .status(400)
        .json({ message: "Error creating class collection", success: true });
    const attendanceId = attendanceDb._id.toString();
    const classSection = await classSectionModel.create({
      std,
      section,
      classId,
      attendanceDbId: attendanceId,
    });
    res.status(200).json(classSection);
  } catch (error) {
    console.log(error);
  }
};

const deleteClass = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const classId = req.params.id;

    const bulkOperations = [];

    const deleteClassOperation = {
      deleteOne: {
        filter: { _id: classId },
      },
    };
    bulkOperations.push(deleteClassOperation);

    const classDb = await classSectionModel
      .findById(classId)
      .session(session)
      .exec();

    if (!classDb)
      return res
        .status(404)
        .json({ message: "No entries found", success: false });
    const attendanceDbId = classDb.attendanceDbId;
    const deleteAttendanceOperation = {
      deleteOne: {
        filter: { _id: attendanceDbId },
      },
    };
    bulkOperations.push(deleteAttendanceOperation);

    // Perform bulk write operation
    const result = await Promise.all([
      classSectionModel.bulkWrite(bulkOperations, { session }),
      attendanceModel.bulkWrite(bulkOperations, { session }),
    ]);

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ message: "Class deleted", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting class", success: false });
  }
};

module.exports = { addClass, deleteClass };
