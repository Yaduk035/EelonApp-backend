const classroomModel = require("../models/classroomModel");
const upcomingTasksModel = require("../models/upcomingTasksClassroom");
const announcementsModel = require("../models/announcementsModel");
const materialsModel = require("../models/materialsModel");
const gradeModel = require("../models/gradeModel");
const studentModel = require("../models/studentSchema");
const staffModel = require("../models/staffSchema");

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
    const duplicateClassroom = await classroomModel.findOne({
      roomName: roomName,
    });
    if (duplicateClassroom)
      return res
        .status(409)
        .json({
          message: `Class room with room name ${roomName} alreay exists`,
        });
    const classrooms = await classroomModel.create(data);
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
    const classRoomData = await classroomModel.findById(id).exec();
    if (!classRoomData)
      return res.status(404).json({ message: "No classRoomData found" });
    const parentDbData = classRoomData?.upcomingTasks;
    const updatedData = {
      upcomingTasks: parentDbData.concat(upcomDbId),
    };
    const classroom = await classroomModel.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    res.status(201).json({ message: "Updated", classroom });
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
    const announcementsDbData = await announcementsModel.create(data);
    if (!announcementsDbData)
      return res
        .status(400)
        .json({ message: "Error fetching data from announcementsDb" });
    const childDbId = [announcementsDbData._id.toString()];

    const classRoomData = await classroomModel.findById(id).exec();
    if (!classRoomData)
      return res.status(404).json({ message: "No classRoomData found" });
    const parentDbData = classRoomData?.announcements;
    const updatedData = {
      announcements: parentDbData.concat(childDbId),
    };
    const classroom = await classroomModel.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    res
      .status(201)
      .json({ message: "Announcements updated", success: true, classroom });
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
    const assignmentsDbData = await announcementsModel.create(data);
    if (!assignmentsDbData)
      return res
        .status(400)
        .json({ message: "Error fetching data from assignmentsDb" });
    const childDbId = [assignmentsDbData._id.toString()];

    const classRoomData = await classroomModel.findById(id).exec();
    if (!classRoomData)
      return res.status(404).json({ message: "No classRoomData found" });
    const parentDbData = classRoomData?.assignments;
    const updatedData = {
      assignments: parentDbData.concat(childDbId),
    };
    const classroom = await classroomModel.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    res
      .status(201)
      .json({ message: "Announcements updated", success: true, classroom });
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
    const materialsDbData = await materialsModel.create(data);
    if (!materialsDbData)
      return res
        .status(400)
        .json({ message: "Error fetching data from materialsDb" });
    const childDbId = [materialsDbData._id.toString()];
    materials;

    const classRoomData = await classroomModel.findById(id).exec();
    if (!classRoomData)
      return res.status(404).json({ message: "No classRoomData found" });
    const parentDbData = classRoomData?.materials;
    const updatedData = {
      materials: parentDbData.concat(childDbId),
    };
    const classroom = await classroomModel.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    res
      .status(201)
      .json({ message: "Announcements updated", success: true, classroom });
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
    const gradeDbData = await gradeModel.create(data);
    if (!gradeDbData)
      return res
        .status(400)
        .json({ message: "Error fetching data from gradesDb" });
    const childDbId = [gradeDbData._id.toString()];

    const classRoomData = await classroomModel.findById(id).exec();
    if (!classRoomData)
      return res.status(404).json({ message: "No classRoomData found" });
    const parentDbData = classRoomData?.grades;
    const updatedData = {
      grades: parentDbData.concat(childDbId),
    };
    const classroom = await classroomModel.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    res
      .status(201)
      .json({ message: "Announcements updated", success: true, classroom });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
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
};
