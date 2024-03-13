const classSectionModel = require('../models/classSectionModel');
const attendanceModel = require('../models/attendanceModel');
const studentModel = require('../models/studentSchema');
const classSectionDropdown = require('../models/classSectionDropdowns');
const schoolModel = require('../models/schoolModel');
const mongoose = require('mongoose');
const {ObjectId} = mongoose.Types;

const addClass = async (req, res) => {
  try {
    const data = req.body;
    const classId = req.body.classId;
    const duplicateClass = await classSectionModel.findOne({
      classId: classId,
    });
    if (duplicateClass)
      return res.status(409).json({
        message: 'Collection with class id already exists',
        success: false,
      });
    const classSection = await classSectionModel.create(data);
    if (!classSection) return res.status(400).json({message: 'Error creating collection', success: false});
    res.status(200).json(classSection);
  } catch (error) {
    console.log(error);
    res.status(500).json({message: 'No server response', success: false});
  }
};

const deleteClass = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) return res.status(400).json({message: 'No id sent on params', success: false});
    const classDb = await classSectionModel.findByIdAndDelete(id);
    if (!classDb) return res.status(404).json({message: 'No class collection found.', success: false});
    res.status(200).json({message: 'Class deleted', success: true});
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'No server response', success: false});
  }
};

const updateClass = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const updateClass = await classSectionModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!updateClass) return res.status(400).json({message: 'Error updating classroom'});
    res.status(201).json(updateClass);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'No server response', success: false});
  }
};

const getAllClasses = async (req, res) => {
  try {
    const classes = await classSectionModel.find().exec();
    if (!classes) return res.status(404).json({message: 'No class rooms found', success: false});
    res.status(200).json(classes);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'No server response', success: false});
  }
};

const filterClasses = async (req, res) => {
  try {
    const {classId, schoolId, std, academicYear} = req.body;
    const pipeline = [];

    if (classId) {
      pipeline.push({$match: {classId: classId}});
    }
    if (schoolId) {
      pipeline.push({$match: {schoolId: schoolId}});
    }
    if (std) {
      pipeline.push({$match: {std: std}});
    }
    if (academicYear) {
      pipeline.push({$match: {academicYear: academicYear}});
    }

    const response = await classSectionModel.aggregate(pipeline);

    if (response.length === 0) return res.status(400).json({message: 'No users found.', success: false});
    res.status(200).json(response);
    // const classes = await classSectionModel.find().exec();
    // if (!classes) return res.status(404).json({message: 'No class rooms found', success: false});
    // res.status(200).json(classes);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'No server response', success: false});
  }
};

const getAClassroom = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) return res.status(400).json({message: 'No id sent', success: false});
    const classes = await classSectionModel.findById(id).exec();
    if (!classes) return res.status(404).json({message: 'No class rooms found', success: false});
    res.status(200).json(classes);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'No server response', success: false});
  }
};

const addStudentToClass = async (req, res) => {
  try {
    const classObjId = req.params.id;
    const studentData = req.body;
    if (!studentData) return res.status(400).json({message: 'No data sent'});

    const classroom = await classSectionModel.findByIdAndUpdate(classObjId, {$addToSet: {students: {$each: studentData.students}}}, {new: true});

    const bulkOps = studentData.students.map(studentId => ({
      updateOne: {
        filter: {_id: studentId},
        update: {
          $set: {classObjId: classObjId, classId: studentData?.classId},
        },
        upsert: true,
      },
    }));
    await studentModel.bulkWrite(bulkOps);
    res.status(201).json(classroom);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'No server response', success: false});
  }
};

const getClassSectionDropdowns = async (req, res) => {
  try {
    const classIds = await classSectionModel.aggregate([{$group: {_id: '$classId'}}, {$project: {_id: 0, classId: '$_id'}}]);
    const classIdArray = classIds.map(doc => doc.classId);
    res.status(200).json(classIdArray);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'No server response', success: false});
  }
};

const getClassSectionManageClsDD = async (req, res) => {
  try {
    const schoolId = req.params.id;
    if (!schoolId) return res.status(400).json({message: 'No schoolId sent'});
    const classIds = await classSectionModel.aggregate([{$match: {schoolId: schoolId}}, {$project: {_id: 1, classId: 1, schoolId: 1}}]);
    if (classIds.length === 0) return res.status(404).json({message: 'No data found', success: false});
    res.status(200).json(classIds);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'No server response', success: false});
  }
};

const getClassDropdowns = async (req, res) => {
  try {
    const classIds = await classSectionModel.aggregate([{$group: {_id: '$std'}}, {$project: {_id: 0, std: '$_id'}}]);
    const classIdArray = classIds.map(doc => doc.std);
    res.status(200).json(classIdArray);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'No server response', success: false});
  }
};

const filterClassDropdowns = async (req, res) => {
  try {
    const {schoolId} = req.body;
    const classIds = await classSectionModel.aggregate([{$match: {schoolId: schoolId}}, {$group: {_id: '$std'}}, {$project: {_id: 0, std: '$_id'}}]);
    const classIdArray = classIds.map(doc => doc.std);
    res.status(200).json(classIdArray);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'No server response', success: false});
  }
};

//////////////////////// Academic year dropdowns   ///////////////////
const getAcademicYearDropdowns = async (req, res) => {
  try {
    const {schoolId} = req.body;
    const academicYrData = await schoolModel.aggregate([
      {
        $match: {_id: new ObjectId(schoolId)},
      },
      {
        $project: {
          _id: 0,
          academicYears: 1,
        },
      },
    ]);
    if (!academicYrData) return res.status(404).json({message: 'No dropdown data found', success: false});
    res.status(200).json(...academicYrData);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'No server response', success: false});
  }
};

const addAcademicYear = async (req, res) => {
  try {
    const {academicData, schoolId} = req.body;
    if (!academicData) return res.status(400).json({message: 'No data sent with body'});

    const result = await schoolModel.findByIdAndUpdate(
      schoolId,
      {
        $addToSet: {academicYears: academicData},
      },
      {new: true}
    );
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'No server response', success: false});
  }
};

const removeAcademicYear = async (req, res) => {
  try {
    const {academicData, schoolId} = req.body;
    if (!academicData || !schoolId) return res.status(400).json({message: 'No data sent with body'});

    const result = await schoolModel.findByIdAndUpdate(
      schoolId,
      {
        $pull: {academicYears: academicData},
      },
      {new: true}
    );
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'No server response', success: false});
  }
};

const addDropdownSubs = async (req, res) => {
  try {
    const {subjects, schoolId} = req.body;
    if (!subjects || !schoolId) return res.status(400).json({message: 'No data sent with body'});

    const result = await schoolModel.findByIdAndUpdate(
      schoolId,
      {
        $addToSet: {subjects: subjects},
      },
      {new: true}
    );
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'No server response', success: false});
  }
};

const removeDropdownSub = async (req, res) => {
  try {
    const {schoolId, subjects} = req.body;
    if (!schoolId || !subjects) return res.status(400).json({message: 'No data sent with body'});

    const result = await schoolModel.findByIdAndUpdate(
      schoolId,
      {
        $pull: {subjects: subjects},
      },
      {new: true}
    );
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'No server response', success: false});
  }
};

const getSubjectsDropdowns = async (req, res) => {
  try {
    const {schoolId} = req.body;
    const academicYrData = await schoolModel.aggregate([
      {
        $match: {_id: new ObjectId(schoolId)},
      },
      {
        $project: {
          _id: 0,
          subjects: 1,
        },
      },
    ]);
    if (!academicYrData) return res.status(404).json({message: 'No dropdown data found', success: false});
    res.status(200).json(...academicYrData);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'No server response', success: false});
  }
};

module.exports = {
  addClass,
  deleteClass,
  updateClass,
  getAllClasses,
  getAClassroom,
  getClassSectionDropdowns,
  addStudentToClass,
  getAcademicYearDropdowns,
  addAcademicYear,

  removeAcademicYear,
  getClassDropdowns,
  getSubjectsDropdowns,
  addDropdownSubs,
  removeDropdownSub,
  getClassSectionManageClsDD,
  filterClasses,
  filterClassDropdowns,
};
