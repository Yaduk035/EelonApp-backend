const syllabusModel = require("../models/syllabusPlannningModel");

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

module.exports = { addSyllabus, removeSyllabus };
