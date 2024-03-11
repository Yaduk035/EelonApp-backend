const schoolModel = require('../models/schoolModel');
const hostelModel = require('../models/hostelRoomModel');
const studentModel = require('../models/studentSchema');
const staffModel = require('../models/staffSchema');

const addHostelDetails = async (req, res) => {
  try {
    const schoolDbId = req.params.id;
    const hostelData = req.body;
    const {hostelName, hostelRoomNo, hostelRoomTypes} = hostelData;
    const result = await schoolModel.findByIdAndUpdate(
      schoolDbId,
      {
        $addToSet: {hostelRoomTypes: hostelRoomTypes},
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

const removeHostelRoomType = async (req, res) => {
  try {
    const schoolDbId = req.params.id;
    const {roomTypeId} = req.body;
    const result = await schoolModel.findByIdAndUpdate(
      schoolDbId,
      {
        $pull: {hostelRoomTypes: _id},
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
      pipeline.push({$match: {id: schoolId}});
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

const addHostelRoom = async (req, res) => {
  try {
    const data = req.body;
    const result = await hostelModel.create(data);
    if (!result) return res.status(400).json({message: 'Error creating data', success: false});
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

const getAllHostelRooms = async (req, res) => {
  try {
    const result = await hostelModel.find();
    if (!result) return res.status(400).json({message: 'Error fetching data', success: false});
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

const getHostelRoomById = async (req, res) => {
  try {
    const result = await hostelModel.findById(req.params.id);
    if (!result) return res.status(400).json({message: 'Error fetching data', success: false});
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

const deleteHostelRoom = async (req, res) => {
  try {
    const result = await hostelModel.findByIdAndDelete(req.params.id);
    if (!result) return res.status(400).json({message: 'Error deleting data', success: false});
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

const updateHostelRoom = async (req, res) => {
  try {
    const data = req.body;
    const result = await hostelModel.findByIdAndUpdate(req.params.id, data);
    if (!result) return res.status(400).json({message: 'Error updating data', success: false});
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

const addOccupantsHostelRoom = async (req, res) => {
  try {
    const {occupantsData, roomNo, type} = req.body;

    if (!occupantsData || !roomNo || !type) return res.status(400).json({message: 'No data sent', success: false});

    const result = await hostelModel.findByIdAndUpdate(req.params.id, {
      $addToSet: {
        occupantsArray: occupantsData,
      },
    });

    if (occupantsData?.occupantType === 'staff') await staffModel.findByIdAndUpdate(occupantsData?.occupantId, {hostelRoomNo: roomNo, hostelRoomType: type});

    if (occupantsData?.occupantType === 'student')
      await studentModel.findByIdAndUpdate(occupantsData?.occupantId, {hostelRoomNo: roomNo, hostelRoomType: type});

    if (!result) return res.status(400).json({message: 'Error updating data', success: false});
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

const removeOccupantsHostelRoom = async (req, res) => {
  try {
    const {occupantsId} = req.body;
    const result = await hostelModel.findByIdAndUpdate(req.params.id, {
      $pull: {
        occupantsArray: occupantsId,
      },
    });
    if (!result) return res.status(400).json({message: 'Error updating data', success: false});
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

const filterHostelRoom = async (req, res) => {
  try {
    const {type, occupantsNo, rentPerMonth, rentPerWeek, rentPerDay, schoolId, roomNo} = req.body;
    const pipeline = [];

    // if (schoolName) {
    //   pipeline.push({
    //     $match: {schoolName: {$regex: new RegExp(schoolName, 'i')}},
    //   });
    // }
    if (type) {
      pipeline.push({$match: {type: type}});
    }
    if (occupantsNo) {
      pipeline.push({$match: {occupantsNo: occupantsNo}});
    }
    if (rentPerMonth) {
      pipeline.push({$match: {rentPerMonth: rentPerMonth}});
    }
    if (rentPerWeek) {
      pipeline.push({$match: {rentPerWeek: rentPerWeek}});
    }
    if (rentPerDay) {
      pipeline.push({$match: {rentPerDay: rentPerDay}});
    }
    if (schoolId) {
      pipeline.push({$match: {schoolId: schoolId}});
    }
    if (roomNo) {
      pipeline.push({$match: {roomNo: roomNo}});
    }

    if (pipeline?.length === 0) return res.status(400).json({message: 'No filtering query sent', success: false});

    const result = await hostelModel.aggregate(pipeline);

    if (!result) return res.status(400).json({message: 'Error deleting hostel details', success: false});
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

module.exports = {
  addHostelDetails,
  deleteHostel,
  getAllHostels,
  filterHostel,
  removeHostelRoomType,
  addHostelRoom,
  getAllHostelRooms,
  getHostelRoomById,
  deleteHostelRoom,
  updateHostelRoom,
  addOccupantsHostelRoom,
  removeOccupantsHostelRoom,
  filterHostelRoom,
};
