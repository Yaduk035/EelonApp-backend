const examMarksModel = require("../models/ExamDb/examMarksModel");

const addMarks = async (req, res) => {
  try {
    if (!req.body)
      return res.status(400).json({ message: "No data send with body" });
    const { academicYear, term, subject, classSection } = req.body;
    // const duplicateData = await examMarksModel.aggregate([
    //   {
    //     $match: {
    //       academicYear: academicYear,
    //       term: term,
    //       subject: subject,
    //       classSection: classSection,
    //     },
    //   },
    // ]);
    const result = await examMarksModel.create(req.body);
    if (!result) res.status(400).json({ message: "Error adding marks" });
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

const getAllMarks = async (req, res) => {
  try {
    const result = await examMarksModel.find().exec();
    if (!result) return res.status(404).json({ message: "No data found" });
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

const getMarksById = async (req, res) => {
  try {
    const result = await examMarksModel.findById(req.params.id).exec();
    if (!result) return res.status(404).json({ message: "No data found" });
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

const filterMarksSubwise = async (req, res) => {
  try {
    const { classSection, academicYear, subject } = req.body;
    if (!req.body)
      return res
        .status(400)
        .json({ message: "No data sent with body", success: false });

    const result = await examMarksModel.aggregate([
      {
        $match: {
          academicYear: academicYear,
          subject: subject,
          classSection: classSection,
        },
      },
    ]);
    if (result.length === 0)
      return res.status(404).json({ message: "No data found" });
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};
const filterMarksClasswise = async (req, res) => {
  try {
    const { classSection, academicYear, subject } = req.body;
    if (!req.body)
      return res
        .status(400)
        .json({ message: "No data sent with body", success: false });

    const result = await examMarksModel.aggregate([
      {
        $match: {
          academicYear: academicYear,
          classSection: classSection,
        },
      },
    ]);
    if (result.length === 0)
      return res.status(404).json({ message: "No data found" });
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

const updateMarks = async (req, res) => {
  try {
    const data = req.body;
    if (!data)
      return res.status(400).json({ message: "No data send with body" });
    const result = await examMarksModel.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    if (!result)
      return res.status(404).json({ message: "No data found", success: false });
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

const deleteMarks = async (req, res) => {
  try {
    const result = await examMarksModel.findByIdAndDelete(req.params.id);
    if (!result)
      return res
        .status(404)
        .json({ message: "Error deleting marks", success: true });
    res.status(201).json({ message: "Marks deleted", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

module.exports = {
  addMarks,
  getAllMarks,
  getMarksById,
  updateMarks,
  deleteMarks,
  filterMarksSubwise,
  filterMarksClasswise,
};
