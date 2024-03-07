const Admin = require('../models/adminModel');
const Staff = require('../models/staffSchema');
const StudentSchema = require('../models/studentSchema');
const classSectionModel = require('../models/classSectionModel');
const AccountModel = require('../models/Accounts/AccountsDb');
const AdmissionModel = require('../models/Accounts/admissionSchema');

const bcrypt = require('bcrypt');

const getUsers = async (req, res) => {
  try {
    const users = await Staff.find().exec();
    if (!users) return res.status(404).json({message: 'No users found.', success: false});
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({error: 'Server error'});
  }
};

const getIndividualStaff = async (req, res) => {
  try {
    const users = await Staff.findById(req.params.id).exec();
    if (!users) return res.status(404).json({message: 'No user found.', success: false});
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({error: 'Server error'});
  }
};

const getAdmins = async (req, res) => {
  try {
    const users = await Admin.find().exec();
    if (!users) return res.status(400).json({message: 'No users found.', success: false});
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({error: 'Server error'});
  }
};

const addAdmin = async (req, res) => {
  try {
    const userData = req.body;
    if (!userData)
      return res.status(400).json({
        message: 'Username and password must not be empty',
        success: false,
      });
    const duplicateUser = await Admin.findOne({email: userData.email}).exec();
    if (duplicateUser) return res.status(409).json({message: 'Username already exists', success: false});

    const hashedPwd = await bcrypt.hash(userData.password, 10);

    const reqData = {
      ...userData,
      password: hashedPwd,
    };
    console.log(reqData);
    const results = await Admin.create(reqData);
    console.log(results);
    res.status(201).json({results, message: 'Admin created', success: true});
  } catch (error) {
    console.log(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await Staff.findByIdAndDelete(id);
    if (!user) return res.status(204).json({message: `User with id ${id} deleted`, success: true});
  } catch (error) {
    console.log(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

/////////////////////////////////////////////////////////

const addStaff = async (req, res) => {
  try {
    const userData = req.body;
    if (!userData)
      return res.status(400).json({
        message: 'Username and password must not be empty',
        success: false,
      });
    const duplicateUser = await Staff.findOne({email: userData.email}).exec();
    if (duplicateUser) return res.status(409).json({message: 'Username already exists', success: false});

    const hashedPwd = await bcrypt.hash(userData.password, 10);

    const reqData = {
      ...userData,
      password: hashedPwd,
    };
    console.log(reqData);
    const results = await Staff.create(reqData);
    console.log(results);
    res.status(201).json({results, message: 'Staff created', success: true});
  } catch (error) {
    console.log(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

const deleteStaff = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await Staff.findByIdAndDelete(id);
    if (!user) return res.status(204).json({message: `User with id ${id} deleted`, success: true});
  } catch (error) {
    console.log(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

const updateStaff = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    if (!data) return res.status(400).json({message: 'No data send with body', success: false});
    const user = await Staff.findByIdAndUpdate(id, data);
    if (!user) return res.status(204).json({message: `User with id ${id} deleted`, success: true});
    res.status(201).json({message: 'Staff updated', success: true});
  } catch (error) {
    console.log(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

/////////////////////////////////////////////////////////////////////////

const getStudents = async (req, res) => {
  try {
    const users = await StudentSchema.find().exec();
    if (!users) return res.status(400).json({message: 'No users found.', success: false});
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({error: 'Server error'});
  }
};

const getStudentsByLimit = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const pipeline = [
      {
        $facet: {
          metadata: [
            {$count: 'totalStudents'},
            {
              $addFields: {
                totalPages: {$ceil: {$divide: ['$totalStudents', limit]}},
              },
            },
          ],
          users: [{$skip: startIndex}, {$limit: limit}],
        },
      },
      {
        $project: {
          users: 1,
          pagination: {
            totalPages: {$arrayElemAt: ['$metadata.totalPages', 0]},
            currentPage: page,
          },
        },
      },
    ];

    const result = await StudentSchema.aggregate(pipeline).exec();
    const {users, pagination} = result[0];

    if (!users || users.length === 0) return res.status(204).json('No books found');

    if (endIndex < pagination.totalUsers) {
      pagination.next = {
        page: page + 1,
        limit: limit,
      };
    }
    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit: limit,
      };
    }

    res.status(200).json({users, pagination});
  } catch (error) {
    console.log(error);
    res.status(500).json({error: 'Server error'});
  }
};

const filterStudentsByclass = async (req, res) => {
  try {
    const {classSection, std, classId} = req.body;
    const pipeline = [];

    if (classSection) {
      pipeline.push({$match: {classSection: classSection}});
    }
    if (std) {
      pipeline.push({$match: {std: std}});
    }
    if (classId) {
      pipeline.push({$match: {classId: classId}});
    }

    const response = await StudentSchema.aggregate(pipeline);
    if (!response) return res.status(404).json({message: 'No data found'});
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

const addStudent = async (req, res) => {
  try {
    const userData = req.body;
    if (!userData)
      return res.status(400).json({
        message: 'Username and password must not be empty',
        success: false,
      });
    const duplicateUser = await StudentSchema.findOne({
      email: userData.email,
    }).exec();
    if (duplicateUser) return res.status(409).json({message: 'Student email already exists', success: false});

    const hashedPwd = await bcrypt.hash(userData.password, 10);

    const reqData = {
      ...userData,
      password: hashedPwd,
    };
    const results = await StudentSchema.create(reqData);

    await AdmissionModel.findByIdAndUpdate(reqData?.admnId, {admitted: true});

    // await AccountModel.create(reqData);

    const classId = reqData?.classId;

    const studentId = [results._id.toString()];

    if (!classId) return res.status(200).json({message: 'Student created without classId', success: true});
    await classSectionModel.updateOne({classId: classId}, {$addToSet: {students: {$each: studentId}}}, {new: true});
    await AccountModel.findByIdAndUpdate(userData?.admnId, {
      studentId: studentId,
    });

    res.status(201).json({results, message: 'Student created', success: true});
  } catch (error) {
    console.log(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

const updateStudent = async (req, res) => {
  try {
    if (!req.params.id) return res.status(400).json({message: 'No id sent'});
    const data = req.body;
    if (!data) return res.status(400).json({message: 'No data sent'});
    const studentData = await StudentSchema.findByIdAndUpdate(req.params.id, data);
    if (!studentData) return res.status(404).json({message: `User with id${req.params.id} not found`});

    // const classId = data?.classId;
    // const studenId = [req.params.id];

    // if (!classId)
    //   return res
    //     .status(200)
    //     .json({ message: "Student created without classId", success: true });
    // await classSectionModel.updateOne(
    //   { classId: classId },
    //   { $addToSet: { students: { $each: studenId } } },
    //   { new: true }
    // );

    res.status(201).json(studentData);
  } catch (error) {
    console.log(error);
  }
};

const deleteStudent = async (req, res) => {
  const id = req.params.id;
  if (!id) return res.status(400).json({message: 'No id sent', success: false});
  try {
    const user = await StudentSchema.findByIdAndDelete(id);
    if (!user) return res.status(404).json({message: `No user with id ${id} found`});
    res.status(201).json({message: `Student with id ${id} deleted`});
  } catch (error) {
    console.log(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

const getStudentByName = async (req, res) => {
  try {
    if (!req.params.id) return res.status(400).json({message: 'No student name sent as params'});
    const users = await StudentSchema.find({
      $or: [{email: {$regex: new RegExp(req.params.id, 'i')}}, {studentName: {$regex: new RegExp(req.params.id, 'i')}}],
    });
    if (!users) return res.status(400).json({message: 'No users found.', success: false});
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({error: 'Server error'});
  }
};

const getStudentById = async (req, res) => {
  try {
    if (!req.params.id) return res.status(400).json({message: 'No student name sent as params'});
    const users = await StudentSchema.findById(req.params.id);
    if (!users) return res.status(400).json({message: 'No users found.', success: false});
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({error: 'Server error'});
  }
};

const getStudentByNameIssueLib = async (req, res) => {
  try {
    if (!req.params.id) return res.status(400).json({message: 'No student name sent as params'});
    const users = await StudentSchema.findOne({
      $or: [{email: req.params.id}],
    });
    if (!users) return res.status(404).json({message: 'No users found.', success: false});
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({error: 'Server error'});
  }
};

const issueLibCard = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    if (!data) return res.status(400).json({message: 'No info sent'});
    const user = await StudentSchema.findByIdAndUpdate(id, data);
    if (!user) return res.status(404).json({message: 'No user found'});
    res.status(201).json({message: `User with id ${id} successfully updated`});
  } catch (error) {
    console.log(error);
    res.status(500).json({message: 'Server error'});
  }
};

const studentFiltering = async (req, res) => {
  const {std, academicYear, email, classSection, admnNo, studentName, rollNo, classId} = req.body;
  try {
    const pipeline = [];

    if (studentName) {
      pipeline.push({
        $match: {studentName: {$regex: new RegExp(studentName, 'i')}},
      });
    }
    if (std) {
      pipeline.push({$match: {std: std}});
    }
    if (academicYear) {
      pipeline.push({$match: {academicYear: academicYear}});
    }
    if (email) {
      pipeline.push({$match: {email: email}});
    }
    if (classSection) {
      pipeline.push({$match: {classSection: classSection}});
    }
    if (classId) {
      pipeline.push({$match: {classId: classId}});
    }
    if (admnNo) {
      pipeline.push({$match: {admnNo: admnNo}});
    }
    if (rollNo) {
      pipeline.push({$match: {rollNo: rollNo}});
    }

    const result = await StudentSchema.aggregate(pipeline);

    if (!result) return res.status(404).json({message: 'No data found'});
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

const staffFiltering = async (req, res) => {
  const {name, userName, email, jobType, jobRole, userType, contactEmail, staffId} = req.body;
  try {
    const pipeline = [];

    if (name) {
      pipeline.push({
        $match: {name: {$regex: new RegExp(name, 'i')}},
      });
    }
    if (userName) {
      pipeline.push({$match: {userName: userName}});
    }
    if (email) {
      pipeline.push({$match: {email: email}});
    }
    if (jobType) {
      pipeline.push({$match: {jobType: jobType}});
    }
    if (jobRole) {
      pipeline.push({$match: {jobRole: jobRole}});
    }
    if (userType) {
      pipeline.push({$match: {userType: userType}});
    }
    if (contactEmail) {
      pipeline.push({$match: {contactEmail: contactEmail}});
    }
    if (staffId) {
      pipeline.push({$match: {staffId: staffId}});
    }

    const result = await Staff.aggregate(pipeline);

    if (!result) return res.status(404).json({message: 'No data found'});
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

module.exports = {
  getUsers,
  addStaff,
  deleteStaff,
  getStudents,
  addStudent,
  deleteStudent,
  addAdmin,
  deleteAdmin,
  getStudentByName,
  issueLibCard,
  getStudentByNameIssueLib,
  getStudentById,
  updateStudent,
  getAdmins,
  getStudentsByLimit,
  getIndividualStaff,
  updateStaff,
  filterStudentsByclass,
  studentFiltering,
  staffFiltering,
};
