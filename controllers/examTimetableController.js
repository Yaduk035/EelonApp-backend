const examTable = require('../models/examTableModel');

const addTimetable = async (req, res) => {
  try {
    const data = req.body;
    if (!data) return res.status(400).json({message: 'No data sent'});
    // const duplicateTable = await
    const timeTable = await examTable.create(data);
    if (!timeTable) return res.status(400).json({message: 'Error adding timetable'});
    res.status(201).json(timeTable);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error'});
  }
};

const getAllExamTimetables = async (req, res) => {
  try {
    const timeTable = await examTable.find().exec();
    if (!timeTable) return res.status(400).json({message: 'No timetable found'});
    res.status(200).json(timeTable);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error'});
  }
};

const filterExamTimetables = async (req, res) => {
  try {
    const {academicYear, schoolId, examType, classId, std} = req.body;
    const pipeline = [];

    if (schoolId) {
      pipeline.push({$match: {schoolId: schoolId}});
    }
    if (examType) {
      pipeline.push({$match: {examType: examType}});
    }
    if (std) {
      pipeline.push({$match: {std: std}});
    }
    if (classId) {
      pipeline.push({$match: {classId: classId}});
    }
    if (academicYear) {
      pipeline.push({$match: {academicYear: academicYear}});
    }

    const response = await examTable.aggregate(pipeline);

    if (response.length === 0) return res.status(400).json({message: 'No data found.', success: false});

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error'});
  }
};

const getExamTimetableByClassId = async (req, res) => {
  try {
    const timeTable = await examTable.findOne({classId: req.params.id}).exec();
    if (!timeTable) return res.status(400).json({message: 'No timetable found'});
    res.status(200).json(timeTable);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error'});
  }
};

const deleteExamTimetableById = async (req, res) => {
  try {
    const timeTable = await examTable.findByIdAndDelete(req.params.id);
    if (!timeTable) return res.status(400).json({message: 'No timetable found'});
    res.status(200).json({message: 'timetable deleted', success: true});
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error'});
  }
};

module.exports = {
  addTimetable,
  getAllExamTimetables,
  getExamTimetableByClassId,
  deleteExamTimetableById,
  filterExamTimetables,
};
