const gradeBookModel = require('../../models/Lesson-planning/gradeBookModel');

const addGradebook = async (req, res) => {
  try {
    const data = req.body;
    if (!data) return res.status(400).json({message: 'No data sent', success: false});
    const result = await gradeBookModel.create(data);
    if (!result) return res.status(400).json({message: 'Error creating data', success: false});
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

const updateGradebook = async (req, res) => {
  try {
    const data = req.body;
    if (!data) return res.status(400).json({message: 'No data sent', success: false});
    const result = await gradeBookModel.findByIdAndUpdate(req.params.id, data, {new: true});
    if (!result) return res.status(400).json({message: 'Error updating data', success: false});
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

const deleteGradebook = async (req, res) => {
  try {
    const {publicIdArray} = req.body;

    if (publicIdArray) {
      await cloudinary.api.delete_resources(publicIdArray);
    }

    const result = await gradeBookModel.findByIdAndDelete(req.params.id);
    if (!result) return res.status(400).json({message: 'Error deleting data', success: false});
    res.status(201).json({message: 'Syllabus deleted', success: true});
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

const getAllGradebooks = async (req, res) => {
  try {
    const result = await gradeBookModel.find().exec();
    if (!result) return res.status(400).json({message: 'Error fetching data', success: false});
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

const getGradebook = async (req, res) => {
  try {
    const result = await gradeBookModel.findById(req.params.id).exec();
    if (!result) return res.status(400).json({message: 'Error fetching data', success: false});
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

const gradebookFiltering = async (req, res) => {
  const {term, academicYear, teacherId, studyRoomId, subject, std} = req.body;
  try {
    const pipeline = [];

    if (term) {
      pipeline.push({$match: {term: term}});
    }
    if (academicYear) {
      pipeline.push({$match: {academicYear: academicYear}});
    }
    if (teacherId) {
      pipeline.push({$match: {teacherId: teacherId}});
    }
    if (studyRoomId) {
      pipeline.push({$match: {studyRoomId: studyRoomId}});
    }
    if (subject) {
      pipeline.push({$match: {subject: subject}});
    }
    if (std) {
      pipeline.push({$match: {std: std}});
    }

    const result = await gradeBookModel.aggregate(pipeline);

    if (result.length === 0) return res.status(404).json({message: 'No data found'});
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

module.exports = {addGradebook, updateGradebook, deleteGradebook, getAllGradebooks, getGradebook, gradebookFiltering};
