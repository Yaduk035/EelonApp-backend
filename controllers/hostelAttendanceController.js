const attendanceModel = require('../models/HostelAttendanceModal');

const addHostelAttendance = async (req, res) => {
  try {
    const {date, schoolId} = req.body;
    const duplicate = await attendanceModel.aggregate([{$match: {date: date, schoolId: schoolId}}]);
    if (duplicate.length !== 0) return res.status(409).json({message: 'Attendance already exists'});
    const result = await attendanceModel.create(req.body);
    if (!result) return res.status(400).json({message: 'Error handling data', success: false});
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

const updateHostelAttendance = async (req, res) => {
  try {
    const result = await attendanceModel.create(req.params.id, req.body);
    if (!result) return res.status(400).json({message: 'Error handling data', success: false});
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

const deleteHostelAttendance = async (req, res) => {
  try {
    const result = await attendanceModel.delete(req.params.id);
    if (!result) return res.status(400).json({message: 'Error handling data', success: false});
    res.status(201).json({message: 'Data deleted'});
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

const getAllHostelAttendance = async (req, res) => {
  try {
    const result = await attendanceModel.find();
    if (!result) return res.status(400).json({message: 'Error handling data', success: false});
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

const getHostelAttendanceById = async (req, res) => {
  try {
    const result = await attendanceModel.findById(req.params.id);
    if (!result) return res.status(400).json({message: 'Error handling data', success: false});
    res.status(201).json({message: 'Data deleted'});
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

const filterHostelAttendance = async (req, res) => {
  try {
    const {date, schoolId} = req.body;
    const pipeline = [];

    if (date) {
      pipeline.push({$match: {date: date}});
    }
    if (schoolId) {
      pipeline.push({$match: {schoolId: schoolId}});
    }

    if (pipeline?.length === 0) return res.status(400).json({message: 'No filtering query sent', success: false});

    const result = await attendanceModel.aggregate(pipeline);

    if (result?.length === 0) return res.status(404).json({message: 'Error deleting hostel details', success: false});
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

module.exports = {addHostelAttendance, updateHostelAttendance, deleteHostelAttendance, getAllHostelAttendance, getHostelAttendanceById, filterHostelAttendance};
