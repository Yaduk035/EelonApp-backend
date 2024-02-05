const classroomModel = require("../models/classroomModel");

const getAllClassrooms = async (req, res) => {
  try {
    const classrooms = await classroomModel.find().exec();
    if (!classrooms)
      return res
        .status(404)
        .json({ message: "No classrooms found", success: false });
    res.status(200).json(classrooms);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getClassroom = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) return res.status(400).json({ message: "No id sent" });
    const classroom = await classroomModel.findById(id).exec();
    if (!classroom)
      return res
        .status(404)
        .json({ message: "No classrooms found", success: false });
    res.status(200).json(classroom);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

const createClassroom = async (req, res) => {
  try {
    const data = req.body;
    if (!data) return res.status(400).json({ message: "No data sent" });
    const classrooms = await classroomModel.create(data);
    res.status(201).json(classrooms);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateClassroom = async (req, res) => {
  try {
    const data = req.body;
    if (!data) return res.status(400).json({ message: "No data sent" });
    const id = req.params.id;
    if (!id) return res.status(400).json({ message: "No id sent" });
    const classroom = await classroomModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    res.status(201).json(classroom);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteClassroom = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) return res.status(400).json({ message: "No id sent" });
    await classroomModel.findByIdAndDelete(id);
    res.status(200).json({ message: `Classroom with id ${id} deleted` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

/////////////////////////////////////////////

module.exports = {
  getAllClassrooms,
  getClassroom,
  createClassroom,
  updateClassroom,
  deleteClassroom,
};
