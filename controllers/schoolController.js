const schoolModel = require('../models/schoolModel');

const addSchool = async (req, res) => {
  try {
    const data = req.body;
    const {schoolId} = data;
    if (!schoolId) return res.status(400).json({message: 'No school id sent', success: false});
    const duplicate = await schoolModel.findOne({schoolId: data.schoolId});
    if (duplicate) return res.status(409).json({message: 'SchoolId already exists', success: false});
    const result = await schoolModel.create(data);
    if (!result) return res.status(400).json({message: 'Error creating school', success: false});
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

const updateSchool = async (req, res) => {
  try {
    const data = req.body;
    const id = req.params.id;
    const result = await schoolModel.findByIdAndUpdate(id, data, {new: true});
    if (!result) return res.status(400).json({message: 'Error updating school', success: false});
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

const deleteSchool = async (req, res) => {
  try {
    const result = await schoolModel.findByIdAndDelete(req.params.id);
    if (!result) return res.status(400).json({message: 'Error deleting school', success: false});
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

const getAllSchools = async (req, res) => {
  try {
    const result = await schoolModel.find();
    if (!result) return res.status(400).json({message: 'Error fetching school', success: false});
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

const getSchool = async (req, res) => {
  try {
    const result = await schoolModel.findById(req.params.id);
    if (!result) return res.status(400).json({message: 'Error creating school', success: false});
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

const schoolFiltering = async (req, res) => {
  const {adminId, schoolId, schoolName, id} = req.body;
  try {
    const pipeline = [];

    if (schoolName) {
      pipeline.push({
        $match: {schoolName: {$regex: new RegExp(schoolName, 'i')}},
      });
    }
    if (adminId) {
      pipeline.push({$match: {adminId: adminId}});
    }
    if (schoolId) {
      pipeline.push({$match: {schoolId: schoolId}});
    }
    if (id) {
      pipeline.push({$match: {id: id}});
    }

    if (pipeline?.length === 0) return res.status(400).json({message: 'No filtering query sent', success: false});
    const result = await StudentSchema.aggregate(pipeline);

    if (result?.length === 0) return res.status(404).json({message: 'No data found'});

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

module.exports = {addSchool, updateSchool, deleteSchool, getAllSchools, getSchool, schoolFiltering};
