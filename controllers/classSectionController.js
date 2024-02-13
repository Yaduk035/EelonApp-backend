const classSectionModel = require("../models/classSectionModel");
const attendanceModel = require("../models/attendanceModel");
const studentModel = require("../models/studentSchema");
const mongoose = require("mongoose");
const { Types } = mongoose;

const addClass = async (req, res) => {
  try {
    const data = req.body;
    const classId = req.body.classId;
    const duplicateClass = await classSectionModel.findOne({
      classId: classId,
    });
    if (duplicateClass)
      return res.status(409).json({
        message: "Collection with class id already exists",
        success: false,
      });
    const classSection = await classSectionModel.create(data);
    if (!classSection)
      return res
        .status(400)
        .json({ message: "Error creating collection", success: false });
    res.status(200).json(classSection);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "No server response", success: false });
  }
};

const deleteClass = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id)
      return res
        .status(400)
        .json({ message: "No id sent on params", success: false });
    const classDb = await classSectionModel.findByIdAndDelete(id);
    if (!classDb)
      return res
        .status(404)
        .json({ message: "No class collection found.", success: false });
    res.status(200).json({ message: "Class deleted", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "No server response", success: false });
  }
};

const updateClass = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const updateClass = await classSectionModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!updateClass)
      return res.status(400).json({ message: "Error updating classroom" });
    res.status(201).json(updateClass);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "No server response", success: false });
  }
};

const getAllClasses = async (req, res) => {
  try {
    const classes = await classSectionModel.find().exec();
    if (!classes)
      return res
        .status(404)
        .json({ message: "No class rooms found", success: false });
    res.status(200).json(classes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "No server response", success: false });
  }
};

const getAClassroom = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id)
      return res.status(400).json({ message: "No id sent", success: false });
    const classes = await classSectionModel.findById(id).exec();
    if (!classes)
      return res
        .status(404)
        .json({ message: "No class rooms found", success: false });
    res.status(200).json(classes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "No server response", success: false });
  }
};

const addStudentToClass = async (req, res) => {
  try {
    const classObjId = req.params.id;
    const studentData = req.body;
    if (!studentData) return res.status(400).json({ message: "No data sent" });

    const classroom = await classSectionModel.findByIdAndUpdate(
      classObjId,
      { $addToSet: { students: { $each: studentData.students } } },
      { new: true }
    );

    const bulkOps = studentData.students.map((studentId) => ({
      updateOne: {
        filter: { _id: studentId },
        update: { $set: { classObjId: classObjId } },
        upsert: true,
      },
    }));
    await studentModel.bulkWrite(bulkOps);
    res.status(201).json(classroom);
  } catch (error) {
    console.error(error);
  }
};

const getClassDropdowns = async (req, res) => {
  try {
    const classIds = await classSectionModel.aggregate([
      { $group: { _id: "$classId" } },
      { $project: { _id: 0, classId: "$_id" } },
    ]);
    const classIdArray = classIds.map((doc) => doc.classId);
    res.status(200).json(classIdArray);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  addClass,
  deleteClass,
  updateClass,
  getAllClasses,
  getAClassroom,
  getClassDropdowns,
  addStudentToClass,
};
