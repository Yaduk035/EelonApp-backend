const admissionModel = require('../../models/Accounts/admissionSchema');

const addStudent = async (req, res) => {
  try {
    const userData = req.body;
    if (!userData)
      return res.status(400).json({
        message: 'No data sent',
        success: false,
      });
    //   const duplicateUser = await StudentSchema.findOne({
    //     email: userData.email,
    //   }).exec();
    //   if (duplicateUser)
    //     return res
    //       .status(409)
    //       .json({ message: "Student email already exists", success: false });

    const results = await admissionModel.create(userData);

    if (!results) return res.status(400).json({message: 'Error adding student', success: false});
    res.status(201).json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

const updateStudent = async (req, res) => {
  try {
    const userData = req.body;
    const id = req.params.id;
    if (!userData)
      return res.status(400).json({
        message: 'No data sent',
        success: false,
      });

    const results = await admissionModel.findByIdAndUpdate(id, userData, {
      new: true,
    });

    if (!results) return res.status(400).json({message: 'Error updating student', success: false});
    res.status(201).json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

const deleteStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const results = await admissionModel.findByIdAndDelete(id);

    if (!results) return res.status(400).json({message: 'Error deleting student', success: false});
    res.status(201).json({message: 'Student deleted', success: true});
  } catch (error) {
    console.log(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

const getAllStudents = async (req, res) => {
  try {
    const results = await admissionModel.find().exec();
    if (!results) return res.status(400).json({message: 'Error fetching student details', success: false});
    res.status(200).json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

const filterAllStudents = async (req, res) => {
  try {
    const {studentName, schoolId, admnNo, applicationNo, group, email, classApplied, academicYear} = req.body;
    const pipeline = [];

    if (schoolId) {
      pipeline.push({$match: {schoolId: schoolId}});
    }
    if (admnNo) {
      pipeline.push({$match: {admnNo: admnNo}});
    }
    if (applicationNo) {
      pipeline.push({$match: {applicationNo: applicationNo}});
    }
    if (group) {
      pipeline.push({$match: {group: group}});
    }
    if (email) {
      pipeline.push({$match: {email: email}});
    }
    if (classApplied) {
      pipeline.push({$match: {classApplied: classApplied}});
    }
    if (studentName) {
      pipeline.push({
        $match: {studentName: {$regex: new RegExp(studentName, 'i')}},
      });
    }

    const response = await admissionModel.aggregate(pipeline);

    if (response.length === 0) return res.status(400).json({message: 'No data found.', success: false});
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

const getStudentsById = async (req, res) => {
  try {
    const id = req.params.id;
    const results = await admissionModel.findById(id).exec();
    if (!results) return res.status(400).json({message: 'Error fetching student details', success: false});
    res.status(200).json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

module.exports = {
  addStudent,
  updateStudent,
  deleteStudent,
  getAllStudents,
  getStudentsById,
  filterAllStudents,
};
