const schoolModel = require('../models/schoolModel');

const addHostelDetails = async (req, res) => {
  try {
    const schoolDbId = req.params.id;
    const hostelData = req.body;
    const {hostelName, hostelRoomNo, hostelRoomTypes} = hostelData;
    const result = await schoolModel.findByIdAndUpdate(
      schoolDbId,
      {
        hostelName,
        hostelRoomNo,
        hostelRoomTypes,
      },
      {new: true}
    );

    if (!result) return res.status(400).json({message: 'Error adding hostel details', success: false});
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

const deleteHostel = async (req, res) => {
  try {
    const schoolDbId = req.params.id;
    const result = await schoolModel.findByIdAndUpdate(
      schoolDbId,
      {
        hostelName: null,
        hostelRoomNo: null,
        hostelRoomTypes: null,
      },
      {new: true}
    );

    if (!result) return res.status(400).json({message: 'Error deleting hostel details', success: false});
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

const getAllHostels = async (req, res) => {
  try {
    const result = await schoolModel.aggregate([
      {
        $project: {
          _id: 1,
          schoolName: 1,
          schoolId: 1,
          hostelName: 1,
          hostelRoomNo: 1,
          hostelRoomTypes: 1,
        },
      },
    ]);

    if (!result) return res.status(400).json({message: 'Error fetching hostel details', success: false});
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

const filterHostel = async (req, res) => {
  try {
    const {adminId, schoolId, schoolName, id} = req.body;
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

    const result = await schoolModel.aggregate([
      ...pipeline,
      {
        $project: {
          _id: 1,
          hostelName: 1,
          hostelRoomNo: 1,
          hostelRoomTypes: 1,
        },
      },
    ]);

    if (!result) return res.status(400).json({message: 'Error deleting hostel details', success: false});
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

module.exports = {addHostelDetails, deleteHostel, getAllHostels, filterHostel};
