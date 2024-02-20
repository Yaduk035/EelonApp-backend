const syllabusModel = require("../models/syllabusPlannningModel");
const QBModel = require("../models/questionBankModel");

const addSyllabus = async (req, res) => {
  try {
    const data = req.body;
    const syllabus = await syllabusModel.create(data);
    if (!syllabus)
      return res
        .status(400)
        .json({ message: "Error creating syllabus", success: false });
    res.status(201).json(syllabus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

const getAllSyllabus = async (req, res) => {
  try {
    const syllabus = await syllabusModel.find().exec();
    if (!syllabus)
      return res
        .status(404)
        .json({ message: "No syllabus found", success: false });
    res.status(200).json(syllabus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

const getSyllabusById = async (req, res) => {
  try {
    const syllabus = await syllabusModel.findById(req.params.id).exec();
    if (!syllabus)
      return res
        .status(404)
        .json({ message: "No syllabus found", success: false });
    res.status(200).json(syllabus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

const syllabusFiltering = async (req, res) => {
  const { std, termName, year, subject, teacherName } = req.body;
  try {
    const pipeline = [];

    if (std) {
      pipeline.push({ $match: { std: std } });
    }
    if (termName) {
      pipeline.push({ $match: { termName: termName } });
    }
    if (year) {
      pipeline.push({ $match: { year: year } });
    }
    if (subject) {
      pipeline.push({ $match: { subject: subject } });
    }
    if (teacherName) {
      pipeline.push({ $match: { subject: subject } });
    }

    const result = await syllabusModel.aggregate(pipeline);

    if (!result) return res.status(404).json({ message: "No data found" });
    res.status(200).json(result);
  } catch (error) {
    console.error("Error filtering question bank:", error);
    throw error;
  }
};

const removeSyllabus = async (req, res) => {
  try {
    const syllabusId = req.params.id;
    const syllabus = await syllabusModel.findByIdAndDelete(syllabusId);
    if (!syllabus)
      return res
        .status(400)
        .json({ message: "Error deleting syllabus", success: false });
    res.status(201).json({ message: "Syllabus deleted", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

const updateSyllabus = async (req, res) => {
  try {
    const syllabusId = req.params.id;
    const data = req.body;
    const syllabus = await syllabusModel.findByIdAndUpdate(syllabusId, data, {
      new: true,
    });
    if (!syllabus)
      return res
        .status(400)
        .json({ message: "Error editing syllabus", success: false });
    res.status(201).json(syllabus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

const addQBs = async (req, res) => {
  try {
    const data = req.body;
    const result = await QBModel.create(data);
    if (!result)
      return res
        .status(400)
        .json({ message: "Error creating syllabus", success: false });
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

const removeQB = async (req, res) => {
  try {
    const Id = req.params.id;
    const result = await QBModel.findByIdAndDelete(Id);
    if (!result)
      return res
        .status(400)
        .json({ message: "Error deleting syllabus", success: false });
    res.status(201).json({ message: "Syllabus deleted", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

const updateQB = async (req, res) => {
  try {
    const Id = req.params.id;
    const data = req.body;
    const result = await QBModel.findByIdAndUpdate(Id, data, {
      new: true,
    });
    if (!result)
      return res
        .status(400)
        .json({ message: "Error editing syllabus", success: false });
    res.status(201).json(syllabus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

const getAllQBs = async (req, res) => {
  try {
    const result = await QBModel.find().exec();
    if (!syllabus)
      return res
        .status(404)
        .json({ message: "No syllabus found", success: false });
    res.status(200).json(syllabus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

const getQBsById = async (req, res) => {
  try {
    const result = await QBModel.findById(req.params.id).exec();
    if (!syllabus)
      return res
        .status(404)
        .json({ message: "No syllabus found", success: false });
    res.status(200).json(syllabus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

const QBFiltering = async (req, res) => {
  const { std, termName, year, subject, teacherName } = req.body;
  try {
    const pipeline = [];

    if (std) {
      pipeline.push({ $match: { std: std } });
    }
    if (termName) {
      pipeline.push({ $match: { termName: termName } });
    }
    if (year) {
      pipeline.push({ $match: { year: year } });
    }
    if (subject) {
      pipeline.push({ $match: { subject: subject } });
    }
    if (teacherName) {
      pipeline.push({ $match: { subject: subject } });
    }

    const result = await QBModel.aggregate(pipeline);

    if (!result) return res.status(404).json({ message: "No data found" });
    res.status(200).json(result);
  } catch (error) {
    console.error("Error filtering question bank:", error);
    throw error;
  }
};

module.exports = {
  addSyllabus,
  removeSyllabus,
  updateSyllabus,
  getAllSyllabus,
  getSyllabusById,
  syllabusFiltering,
  addQBs,
  removeQB,
  updateQB,
  getAllQBs,
  getQBsById,
  QBFiltering,
};
