const schoolModel = require('../models/schoolModel');
const adminModel = require('../models/adminModel');

const addSchool = async (req, res) => {
  try {
    const data = req.body;
    const {schoolIndexNo} = data;
    if (!schoolIndexNo) return res.status(400).json({message: 'No school index id sent', success: false});
    const duplicate = await schoolModel.findOne({schoolIndexNo: schoolIndexNo});
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
  }
};

const allocateAdminToSchool = async (req, res) => {
  try {
    const {schoolId, adminId} = req.body;
    const school = await schoolModel.findByIdAndUpdate(
      schoolId,
      {
        $addToSet: {admin: adminId},
      },
      {new: true}
    );
    const admin = await adminModel.findByIdAndUpdate(adminId, {schoolId: schoolId}, {new: true});
    if (!school || !admin) return res.status(400).json({message: 'Error allocating admin'});
    res.status(201).json({school, admin});
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

module.exports = {addSchool, updateSchool, deleteSchool, getAllSchools, getSchool, schoolFiltering, allocateAdminToSchool};
