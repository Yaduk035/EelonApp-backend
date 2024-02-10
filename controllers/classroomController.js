const classroomModel = require("../models/classroomModel");
const upcomingTasksModel = require("../models/upcomingTasksClassroom");
const announcementsModel = require("../models/announcementsModel");
const materialsModel = require("../models/materialsModel");
const gradeModel = require("../models/gradeModel");
const studentModel = require("../models/studentSchema");
const staffModel = require("../models/staffSchema");
const assignmentModel = require("../models/assignmentModel");

const immer = require("immer");
const produce = immer.produce;

const getAllClassrooms = async (req, res) => {
  try {
    const classrooms = await classroomModel.find().exec();
    if (!classrooms)
      return res
        .status(404)
        .json({ message: "No classrooms found", success: false });
    res.status(200).json(classrooms);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getClassroom = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) return res.status(400).json({ message: "No id sent" });
    const classroom = await classroomModel.findById(id).exec();
    if (!classroom)
      return res
        .status(404)
        .json({ message: "No classrooms found", success: false });
    res.status(200).json(classroom);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

const createClassroom = async (req, res) => {
  try {
    const data = req.body;
    if (!data) return res.status(400).json({ message: "No data sent" });
    const roomName = data.roomName;
    // const duplicateClassroom = await classroomModel.findOne({
    //   roomName: roomName,
    // });
    // if (duplicateClassroom)
    //   return res.status(409).json({
    //     message: `Class room with room name ${roomName} alreay exists`,
    //   });
    const classrooms = await classroomModel.create(data);
    const DbId = [classrooms._id.toString()];

    await staffModel.findByIdAndUpdate(
      data.createdBy,
      { $addToSet: { classRooms: { $each: DbId } } },
      { new: true }
    );

    res.status(201).json(classrooms);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteClassroom = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) return res.status(400).json({ message: "No id sent" });
    await classroomModel.findByIdAndDelete(id);
    res.status(200).json({ message: `Classroom with id ${id} deleted` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

///////////////////////////////////////////////////////////////////////////////////

const getStaffClassrooms = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId)
      return res.status(400).json({ message: "No id sent", success: false });
    const user = await staffModel.findById(userId).exec();
    if (!user) return res.status(404).json({ message: "User not found" });
    const classRoomsEnrolled = user.classRooms;
    const classroomsData = await classroomModel
      .find({ _id: { $in: classRoomsEnrolled } })
      .exec();

    res.status(200).json(classroomsData);
  } catch (error) {
    console.log(error);
  }
};

const getStudentClassrooms = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId)
      return res.status(400).json({ message: "No id sent", success: false });
    const user = await studentModel.findById(userId).exec();
    if (!user) return res.status(404).json({ message: "User not found" });
    const classRoomsEnrolled = user.classRooms;
    const classroomsData = await classroomModel
      .find({ _id: { $in: classRoomsEnrolled } })
      .exec();

    res.status(200).json(classroomsData);
  } catch (error) {
    console.log(error);
  }
};

const getClassroomTeachers = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId)
      return res.status(400).json({ message: "No id sent", success: false });
    const classRooms = await classroomModel.findById(userId).exec();
    if (!classRooms)
      return res.status(404).json({ message: "Classroom not found" });
    const staffsArray = classRooms.teachers;
    const classroomsData = await staffModel
      .find({ _id: { $in: staffsArray } })
      .exec();

    res.status(200).json(classroomsData);
  } catch (error) {
    console.log(error);
  }
};

const getClassroomStudents = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId)
      return res.status(400).json({ message: "No id sent", success: false });
    const classRooms = await classroomModel.findById(userId).exec();
    if (!classRooms)
      return res.status(404).json({ message: "Classroom not found" });
    const studentsArray = classRooms.students;
    const classroomsData = await studentModel
      .find({ _id: { $in: studentsArray } })
      .exec();

    res.status(200).json(classroomsData);
  } catch (error) {
    console.log(error);
  }
};

const getStudentsByArrayData = async (req, res) => {
  try {
    const data = req.body.studentArray;
    const studentData = await studentModel.find({ _id: { $in: data } }).exec();
    if (!studentData)
      return res.status(400).json({ message: "No data found", success: false });
    res.status(200).json(studentData);
  } catch (error) {
    console.log(error);
  }
};

/////////////////////////////////////////////////////////////

const getUpcomingTasks = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId)
      return res.status(400).json({ message: "No id sent", success: false });
    const classroom = await classroomModel.findById(userId).exec();
    if (!classroom) return res.status(404).json({ message: "User not found" });
    const upcomingTasksArray = classroom.upcomingTasks;
    const classroomsData = await upcomingTasksModel
      .find({ _id: { $in: upcomingTasksArray } })
      .exec();

    res.status(200).json(classroomsData);
  } catch (error) {
    console.log(error);
  }
};

const getAnnouncements = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId)
      return res.status(400).json({ message: "No id sent", success: false });
    const classroom = await classroomModel.findById(userId).exec();
    if (!classroom) return res.status(404).json({ message: "User not found" });
    const dataArray = classroom.announcements;
    const classroomsData = await announcementsModel
      .find({ _id: { $in: dataArray } })
      .exec();

    res.status(200).json(classroomsData);
  } catch (error) {
    console.log(error);
  }
};

const getAssignments = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId)
      return res.status(400).json({ message: "No id sent", success: false });
    const classroom = await classroomModel.findById(userId).exec();
    if (!classroom) return res.status(404).json({ message: "User not found" });
    const dataArray = classroom.assignments;
    const classroomsData = await assignmentModel
      .find({ _id: { $in: dataArray } })
      .exec();

    res.status(200).json(classroomsData);
  } catch (error) {
    console.log(error);
  }
};

const getMaterials = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId)
      return res.status(400).json({ message: "No id sent", success: false });
    const classroom = await classroomModel.findById(userId).exec();
    if (!classroom) return res.status(404).json({ message: "User not found" });
    const dataArray = classroom.materials;
    const classroomsData = await materialsModel
      .find({ _id: { $in: dataArray } })
      .exec();

    res.status(200).json(classroomsData);
  } catch (error) {
    console.log(error);
  }
};

const getGrades = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId)
      return res.status(400).json({ message: "No id sent", success: false });
    const classroom = await classroomModel.findById(userId).exec();
    if (!classroom) return res.status(404).json({ message: "User not found" });
    const dataArray = classroom.grades;
    const classroomsData = await gradeModel
      .find({ _id: { $in: dataArray } })
      .exec();

    res.status(200).json(classroomsData);
  } catch (error) {
    console.log(error);
  }
};

///////////////////////////////////////////////////////////////////////////////////////////
const getTeacher = async (req, res) => {
  try {
    const email = req.params.id;
    if (!email) return res.status(400).json({ message: "No id sent" });
    const teacher = await staffModel.findOne({ email: email }).exec();
    if (!teacher)
      return res
        .status(404)
        .json({ message: "No student found", success: false });
    res.status(200).json(teacher);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getStudent = async (req, res) => {
  try {
    const email = req.params.id;
    if (!email) return res.status(400).json({ message: "No id sent" });
    const student = await studentModel.findOne({ email: email }).exec();
    if (!student)
      return res
        .status(404)
        .json({ message: "No student found", success: false });
    res.status(200).json(student);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

////////////////////////////////////////////////////////////////////////////////////////////

const updateClassroomTeacher = async (req, res) => {
  try {
    const data = req.body;
    if (!data) return res.status(400).json({ message: "No data sent" });
    const id = req.params.id;
    if (!id) return res.status(400).json({ message: "No id sent" });

    const classroom = await classroomModel.findByIdAndUpdate(
      id,
      { $addToSet: { teachers: { $each: data.teachers } } },
      { new: true }
    );

    const bulkOps = data.teachers.map((teacherId) => ({
      updateOne: {
        filter: { _id: teacherId },
        update: { $addToSet: { classRooms: id } },
      },
    }));
    await staffModel.bulkWrite(bulkOps);
    res.status(201).json(classroom);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateClassroomStudent = async (req, res) => {
  try {
    const data = req.body;
    if (!data) return res.status(400).json({ message: "No data sent" });
    const id = req.params.id;
    if (!id) return res.status(400).json({ message: "No id sent" });

    const classroom = await classroomModel.findByIdAndUpdate(
      id,
      { $addToSet: { students: { $each: data.students } } },
      { new: true }
    );

    const bulkOps = data.students.map((studentId) => ({
      updateOne: {
        filter: { _id: studentId },
        update: { $addToSet: { classRooms: id } },
      },
    }));
    await studentModel.bulkWrite(bulkOps);
    res.status(201).json(classroom);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateClassroomUpcomingtask = async (req, res) => {
  try {
    const data = req.body;
    if (!data) return res.status(400).json({ message: "No data sent" });
    const id = req.params.id;
    if (!id) return res.status(400).json({ message: "No id sent" });
    const upcomingTaskDbData = await upcomingTasksModel.create(data);
    if (!upcomingTaskDbData)
      return res.status(400).json({ message: "Error data on upcomingTaskDb" });
    const upcomDbId = [upcomingTaskDbData._id.toString()];
    if (!upcomDbId)
      return res.status(404).json({ message: "No upComDbId found" });

    const bulkOps = upcomDbId.map((Id) => ({
      updateOne: {
        filter: { _id: id },
        update: { $addToSet: { upcomingTasks: Id } },
        upsert: true,
      },
    }));
    await classroomModel.bulkWrite(bulkOps);

    res.status(201).json({ message: "Updated", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateClassroomAnnouncement = async (req, res) => {
  try {
    const data = req.body;
    if (!data) return res.status(400).json({ message: "No data sent" });
    const id = req.params.id;
    if (!id) return res.status(400).json({ message: "No id sent" });
    const [announcementsDbData] = await announcementsModel.create(data);
    if (!announcementsDbData)
      return res
        .status(400)
        .json({ message: "Error fetching data from announcementsDb" });
    const childDbId = [announcementsDbData._id.toString()];
    if (!childDbId)
      return res.status(404).json({ message: "No upComDbId found" });

    const bulkOps = childDbId.map((Id) => ({
      updateOne: {
        filter: { _id: id },
        update: { $addToSet: { announcements: Id } },
        upsert: true,
      },
    }));
    await classroomModel.bulkWrite(bulkOps);

    res.status(201).json({ message: "Updated", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateClassroomAssignment = async (req, res) => {
  try {
    const data = req.body;
    if (!data) return res.status(400).json({ message: "No data sent" });
    const id = req.params.id;
    if (!id) return res.status(400).json({ message: "No id sent" });
    const [assignmentsDbData] = await assignmentModel.create(data);
    if (!assignmentsDbData)
      return res
        .status(400)
        .json({ message: "Error fetching data from assignmentsDb" });
    const childDbId = [assignmentsDbData._id.toString()];

    const bulkOps = childDbId.map((Id) => ({
      updateOne: {
        filter: { _id: id },
        update: { $addToSet: { assignments: Id } },
        upsert: true,
      },
    }));
    await classroomModel.bulkWrite(bulkOps);

    res.status(201).json({ message: "Updated", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateClassroomMaterial = async (req, res) => {
  try {
    const data = req.body;
    if (!data) return res.status(400).json({ message: "No data sent" });
    const id = req.params.id;
    if (!id) return res.status(400).json({ message: "No id sent" });
    const [DbData] = await materialsModel.create(data);
    if (!DbData)
      return res
        .status(400)
        .json({ message: "Error fetching data from assignmentsDb" });
    const childDbId = [DbData._id.toString()];

    const bulkOps = childDbId.map((Id) => ({
      updateOne: {
        filter: { _id: id },
        update: { $addToSet: { materials: Id } },
        upsert: true,
      },
    }));
    await classroomModel.bulkWrite(bulkOps);

    res.status(201).json({ message: "Updated", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateClassroomGrade = async (req, res) => {
  try {
    const data = req.body;
    if (!data) return res.status(400).json({ message: "No data sent" });
    const id = req.params.id;
    if (!id) return res.status(400).json({ message: "No id sent" });
    const [gradeDbData] = await gradeModel.create(data);
    if (!gradeDbData)
      return res
        .status(400)
        .json({ message: "Error fetching data from gradesDb" });
    const childDbId = [gradeDbData._id.toString()];

    const bulkOps = childDbId.map((Id) => ({
      updateOne: {
        filter: { _id: id },
        update: { $addToSet: { grades: Id } },
        upsert: true,
      },
    }));
    await classroomModel.bulkWrite(bulkOps);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

//////////////////////////////////////////////

const deleteClassroomUpcomingTask = async (req, res) => {
  try {
    const id = req.params.id;
    const data = [req.body.deleteId];
    if (!data) return res.status(400).json({ message: "Invalid data sent" });

    const deleteResult = await upcomingTasksModel.findByIdAndDelete(data);
    if (!deleteResult)
      return res.status(404).json({ message: "Upcoming task not found" });

    const bulkOps = data.map((Id) => ({
      updateOne: {
        filter: { _id: id },
        update: { $pull: { upcomingTasks: Id } },
      },
    }));
    await classroomModel.bulkWrite(bulkOps);
    res.status(200).json({ message: "Upcoming task deleted", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteClassroomAnnouncement = async (req, res) => {
  try {
    const id = req.params.id;
    const data = [req.body.deleteId];
    if (!data) return res.status(400).json({ message: "Invalid data sent" });

    const deleteResult = await announcementsModel.findByIdAndDelete(data);
    if (!deleteResult)
      return res.status(404).json({ message: "Upcoming task not found" });

    const bulkOps = data.map((Id) => ({
      updateOne: {
        filter: { _id: id },
        update: { $pull: { announcements: Id } },
      },
    }));
    await classroomModel.bulkWrite(bulkOps);
    res.status(200).json({ message: "Upcoming task deleted", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteClassroomAssignment = async (req, res) => {
  try {
    const id = req.params.id;
    const data = [req.body.deleteId];
    if (!data) return res.status(400).json({ message: "Invalid data sent" });

    const deleteResult = await assignmentModel.findByIdAndDelete(data);
    if (!deleteResult)
      return res.status(404).json({ message: "Upcoming task not found" });

    const bulkOps = data.map((Id) => ({
      updateOne: {
        filter: { _id: id },
        update: { $pull: { assignments: Id } },
      },
    }));
    await classroomModel.bulkWrite(bulkOps);
    res.status(200).json({ message: "Upcoming task deleted", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteClassroomMaterial = async (req, res) => {
  try {
    const id = req.params.id;
    const data = [req.body.deleteId];
    if (!data) return res.status(400).json({ message: "Invalid data sent" });

    const deleteResult = await materialsModel.findByIdAndDelete(data);
    if (!deleteResult)
      return res.status(404).json({ message: "Upcoming task not found" });

    const bulkOps = data.map((Id) => ({
      updateOne: {
        filter: { _id: id },
        update: { $pull: { materials: Id } },
      },
    }));
    await classroomModel.bulkWrite(bulkOps);
    res.status(200).json({ message: "Upcoming task deleted", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteClassroomGrade = async (req, res) => {
  try {
    const id = req.params.id;
    const data = [req.body.deleteId];
    if (!data) return res.status(400).json({ message: "Invalid data sent" });

    const deleteResult = await gradeModel.findByIdAndDelete(data);
    if (!deleteResult)
      return res.status(404).json({ message: "Upcoming task not found" });

    const bulkOps = data.map((Id) => ({
      updateOne: {
        filter: { _id: id },
        update: { $pull: { grades: Id } },
      },
    }));
    await classroomModel.bulkWrite(bulkOps);
    res.status(200).json({ message: "Upcoming task deleted", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

const addToTurnedInListAssignments = async (req, res) => {
  try {
    const data = req.body.studentId;
    const assignmentId = req.params.id;
    const assignment = await assignmentModel.findByIdAndUpdate(
      assignmentId,
      { $addToSet: { studentsTurnedIn: { $each: data } } },
      { new: true }
    );
    if (!assignment)
      return res.status(400).json({ message: "No assignments found" });
    res.status(201).json({
      message: "Student(s) added to the assignment list",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

const removeFromTurnedInListAssignments = async (req, res) => {
  try {
    const data = req.body.studentId;
    const assignmentId = req.params.id;
    const assignment = await assignmentModel.findByIdAndUpdate(
      assignmentId,
      { $pullAll: { studentsTurnedIn: data } },
      { new: true }
    );
    if (!assignment)
      return res.status(400).json({ message: "No assignments found" });
    res.status(201).json({
      message: "Student(s) removed to the assignment list",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

/////////////////////////////////////////////

const deleteTeacher = async (req, res) => {
  try {
    const data = req.body;
    if (!data) return res.status(400).json({ message: "No data sent" });
    const id = req.params.id;
    if (!id) return res.status(400).json({ message: "No id sent" });

    const classroom = await classroomModel.findByIdAndUpdate(
      id,
      { $pull: { teachers: { $in: data.teachers } } },
      { new: true }
    );
    const bulkOps = data.teachers.map((teacherId) => ({
      updateOne: {
        filter: { _id: teacherId },
        update: { $pull: { classRooms: id } },
      },
    }));
    await staffModel.bulkWrite(bulkOps);

    res.status(201).json(classroom);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deletStudent = async (req, res) => {
  try {
    const data = req.body;
    if (!data) return res.status(400).json({ message: "No data sent" });
    const id = req.params.id;
    if (!id) return res.status(400).json({ message: "No id sent" });

    const classroom = await classroomModel.findByIdAndUpdate(
      id,
      { $pull: { students: { $in: data.students } } },
      { new: true }
    );
    const bulkOps = data.students.map((studentId) => ({
      updateOne: {
        filter: { _id: studentId },
        update: { $pull: { classRooms: id } },
      },
    }));
    await studentModel.bulkWrite(bulkOps);

    res.status(201).json(classroom);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

const searchStudentByNameClassroom = async (req, res) => {
  try {
    if (!req.params.id)
      return res
        .status(400)
        .json({ message: "No student name sent as params" });
    const users = await studentModel.findOne({
      $or: [{ email: req.params.id }],
    });
    if (!users)
      return res
        .status(400)
        .json({ message: "No users found.", success: false });
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

const searchTeacherByNameClassroom = async (req, res) => {
  try {
    if (!req.params.id)
      return res
        .status(400)
        .json({ message: "No teacher name sent as params" });
    const users = await staffModel.findOne({
      $or: [{ email: req.params.id }],
    });
    if (!users)
      return res
        .status(400)
        .json({ message: "No users found.", success: false });
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getAllClassrooms,
  getClassroom,
  createClassroom,
  deleteClassroom,
  updateClassroomTeacher,
  updateClassroomStudent,
  updateClassroomAnnouncement,
  updateClassroomAssignment,
  updateClassroomGrade,
  updateClassroomMaterial,
  updateClassroomUpcomingtask,
  deleteTeacher,
  deletStudent,
  getTeacher,
  getStudent,
  getStaffClassrooms,
  getStudentClassrooms,
  deleteClassroomUpcomingTask,
  deleteClassroomAnnouncement,
  deleteClassroomAssignment,
  deleteClassroomMaterial,
  deleteClassroomGrade,
  getUpcomingTasks,
  getAnnouncements,
  getAssignments,
  getMaterials,
  getGrades,
  getClassroomTeachers,
  getClassroomStudents,
  searchStudentByNameClassroom,
  searchTeacherByNameClassroom,
  addToTurnedInListAssignments,
  removeFromTurnedInListAssignments,
  getStudentsByArrayData,
};
