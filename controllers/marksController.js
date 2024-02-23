const examMarksModel = require("../models/ExamDb/examMarksModel");
const studentModel = require("../models/studentSchema");
const HallticketModel = require("../models/ExamDb/hallticketDb");
const scholasticMarkModel = require("../models/ExamDb/scholasticModel");

const addMarks = async (req, res) => {
  try {
    if (!req.body)
      return res.status(400).json({ message: "No data send with body" });
    const { academicYear, term, subject, classSection } = req.body;
    // const duplicateData = await examMarksModel.aggregate([
    //   {
    //     $match: {
    //       academicYear: academicYear,
    //       term: term,
    //       subject: subject,
    //       classSection: classSection,
    //     },
    //   },
    // ]);
    const result = await examMarksModel.create(req.body);
    if (!result) res.status(400).json({ message: "Error adding marks" });
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

const getAllMarks = async (req, res) => {
  try {
    const result = await examMarksModel.find().exec();
    if (!result) return res.status(404).json({ message: "No data found" });
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

const getMarksById = async (req, res) => {
  try {
    const result = await examMarksModel.findById(req.params.id).exec();
    if (!result) return res.status(404).json({ message: "No data found" });
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

const filterMarksSubwise = async (req, res) => {
  try {
    const { classSection, academicYear, subject } = req.body;
    if (!req.body)
      return res
        .status(400)
        .json({ message: "No data sent with body", success: false });

    const result = await examMarksModel.aggregate([
      {
        $match: {
          academicYear: academicYear,
          subject: subject,
          classSection: classSection,
        },
      },
    ]);
    if (result.length === 0)
      return res.status(404).json({ message: "No data found" });
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};
// const filterMarksClasswise = async (req, res) => {
//   try {
//     const { classSection, academicYear, subject } = req.body;
//     if (!req.body)
//       return res
//         .status(400)
//         .json({ message: "No data sent with body", success: false });

//     const result = await examMarksModel.aggregate([
//       {
//         $match: {
//           academicYear: academicYear,
//           classSection: classSection,
//         },
//       },
//     ]);
//     if (result.length === 0)
//       return res.status(404).json({ message: "No data found" });
//     res.status(200).json(result);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error", success: false });
//   }
// };

const filterMarksClasswise = async (req, res) => {
  try {
    const studentId = req.params.id;
    const { classSection, academicYear } = req.body;

    // const student = await studentModel.find;

    const pipeline = [
      // Match documents containing the specified studentId in marksArray
      {
        $match: {
          academicYear: academicYear,
          classSection: classSection,
        },
      },
      // Unwind marksArray to work with individual marks
      // { $unwind: "$subject" },
      { $unwind: "$marksArray" },
      {
        $group: {
          _id: "$marksArray.studentId",
          studentName: { $first: "$marksArray.studentName" },
          marks: {
            $push: {
              subject: "$subject",
              internal: "$marksArray.internal",
              external: "$marksArray.external",
              total: "$marksArray.total",
            },
          },
        },
      },
    ];

    const result = await examMarksModel.aggregate(pipeline);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

const getSubwiseTotalMarks = async (req, res) => {
  try {
    const { academicYear, classSection } = req.body;

    const result = await examMarksModel.aggregate([
      {
        $match: {
          academicYear: academicYear,
          classSection: classSection,
        },
      },
      {
        $unwind: "$marksArray",
      },
      {
        $group: {
          _id: "$subject",
          totalMarks: { $sum: "$marksArray.total" },
          studentIdArray: { $addToSet: "$marksArray.studentId" },
        },
      },
      {
        $project: {
          _id: 1,
          totalMarks: 1,
          totalStudents: { $size: "$studentIdArray" },
        },
      },
    ]);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
  }
};

const filterMarksStudentwise = async (req, res) => {
  try {
    const studentId = req.params.id;
    const { classSection, academicYear } = req.body;

    // const student = await studentModel.find;

    const pipeline = [
      {
        $match: {
          academicYear: academicYear,
          classSection: classSection,
        },
      },
      { $unwind: "$marksArray" },
      // Filter for marks of the specified student
      {
        $match: {
          "marksArray.studentId": studentId,
        },
      },
      // Group by subject to accumulate marks for each subject
      {
        $group: {
          _id: "$subject",
          internal: { $sum: "$marksArray.internal" },
          external: { $sum: "$marksArray.external" },
          total: { $sum: "$marksArray.total" },
        },
      },
    ];

    const result = await examMarksModel.aggregate(pipeline);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

const updateMarks = async (req, res) => {
  try {
    const data = req.body;
    if (!data)
      return res.status(400).json({ message: "No data send with body" });
    const result = await examMarksModel.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    if (!result)
      return res.status(404).json({ message: "No data found", success: false });
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

const deleteMarks = async (req, res) => {
  try {
    const result = await examMarksModel.findByIdAndDelete(req.params.id);
    if (!result)
      return res
        .status(404)
        .json({ message: "Error deleting marks", success: true });
    res.status(201).json({ message: "Marks deleted", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

///////////////////////////  Scholastic marks  /////////////////////

const addScholasticMarks = async (req, res) => {
  try {
    if (!req.body)
      return res.status(400).json({ message: "No data send with body" });
    const { academicYear, term, subject, classSection } = req.body;
    // const duplicateData = await examMarksModel.aggregate([
    //   {
    //     $match: {
    //       academicYear: academicYear,
    //       term: term,
    //       subject: subject,
    //       classSection: classSection,
    //     },
    //   },
    // ]);
    const result = await scholasticMarkModel.create(req.body);
    if (!result) res.status(400).json({ message: "Error adding marks" });
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

const getAllScholasticMarks = async (req, res) => {
  try {
    const result = await scholasticMarkModel.find().exec();
    if (!result) return res.status(404).json({ message: "No data found" });
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

const getScholasticMarksById = async (req, res) => {
  try {
    const result = await scholasticMarkModel.findById(req.params.id).exec();
    if (!result) return res.status(404).json({ message: "No data found" });
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

const filterScholasticMarksClasswise = async (req, res) => {
  try {
    const studentId = req.params.id;
    const { classSection, academicYear } = req.body;

    // const student = await studentModel.find;

    const pipeline = [
      // Match documents containing the specified studentId in marksArray
      {
        $match: {
          academicYear: academicYear,
          classSection: classSection,
        },
      },
      // Unwind marksArray to work with individual marks
      // { $unwind: "$subject" },
      { $unwind: "$marksArray" },
      {
        $group: {
          _id: "$marksArray.studentId",
          studentName: { $first: "$marksArray.studentName" },
          marks: {
            $push: {
              subject: "$subject",
              internal: "$marksArray.internal",
              external: "$marksArray.external",
              total: "$marksArray.total",
            },
          },
        },
      },
    ];

    const result = await scholasticMarkModel.aggregate(pipeline);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

const filterScholasticMarksStudentwise = async (req, res) => {
  try {
    const studentId = req.params.id;
    const { classSection, academicYear } = req.body;

    // const student = await studentModel.find;

    const pipeline = [
      {
        $match: {
          academicYear: academicYear,
          classSection: classSection,
        },
      },
      { $unwind: "$marksArray" },
      // Filter for marks of the specified student
      {
        $match: {
          "marksArray.studentId": studentId,
        },
      },
      // Group by subject to accumulate marks for each subject
      {
        $group: {
          _id: "$subject",
          internal: { $sum: "$marksArray.internal" },
          external: { $sum: "$marksArray.external" },
          total: { $sum: "$marksArray.total" },
        },
      },
      {
        $project: {
          _id: 1,
          totalMarks: 1,
          totalStudents: { $size: "$studentIdArray" },
        },
      },
    ];

    const result = await scholasticMarkModel.aggregate(pipeline);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

const updateScholasticMarks = async (req, res) => {
  try {
    const data = req.body;
    if (!data)
      return res.status(400).json({ message: "No data send with body" });
    const result = await scholasticMarkModel.findByIdAndUpdate(
      req.params.id,
      data,
      {
        new: true,
      }
    );
    if (!result)
      return res.status(404).json({ message: "No data found", success: false });
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

const deleteScholasticMarks = async (req, res) => {
  try {
    const result = await scholasticMarkModel.findByIdAndDelete(req.params.id);
    if (!result)
      return res
        .status(404)
        .json({ message: "Error deleting marks", success: true });
    res.status(201).json({ message: "Marks deleted", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

////////////////////////////  Halltickets  //////////////////////////

const createClasswiseHalltickets = async (req, res) => {
  try {
    const data = req.body;
    const result = await HallticketModel.create(data);
    if (!result)
      return res
        .status(400)
        .json({ message: "Error creating hallticket", success: false });
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllHalltickets = async (req, res) => {
  try {
    const result = await HallticketModel.find().exec();
    if (!result)
      return res
        .status(400)
        .json({ message: "Error creating hallticket", success: false });
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getHallticketsById = async (req, res) => {
  try {
    const result = await HallticketModel.findById(req.params.id).exec();
    if (!result)
      return res
        .status(400)
        .json({ message: "Error creating hallticket", success: false });
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const hallticketFiltering = async (req, res) => {
  const { term, academicYear, classSection } = req.body;
  try {
    const pipeline = [];

    if (term) {
      pipeline.push({ $match: { term: term } });
    }
    if (academicYear) {
      pipeline.push({ $match: { academicYear: academicYear } });
    }
    if (classSection) {
      pipeline.push({ $match: { classSection: classSection } });
    }

    const result = await HallticketModel.aggregate(pipeline);

    if (!result) return res.status(404).json({ message: "No data found" });
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

const deleteClasswiseHalltickets = async (req, res) => {
  try {
    const ticketId = req.params.id;
    const result = await HallticketModel.findByIdAndDelete(ticketId);
    if (!result)
      return res
        .status(400)
        .json({ message: "Error deleting hallticket", success: false });
    res.status(201).json({ message: "Halltickets deleted", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const addStudentHalltickets = async (req, res) => {
  const ticketId = req.params.id;
  const hallticketArray = req.body.halltickets;
  try {
    const result = await HallticketModel.findByIdAndUpdate(
      ticketId,
      { $addToSet: { halltickets: { $each: hallticketArray } } },
      { new: true }
    );
    if (!result)
      return res
        .status(400)
        .json({ message: "Error updating hallticket", success: false });
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  addMarks,
  getAllMarks,
  getMarksById,
  updateMarks,
  deleteMarks,
  filterMarksSubwise,
  filterMarksClasswise,
  filterMarksStudentwise,
  createClasswiseHalltickets,
  deleteClasswiseHalltickets,
  addStudentHalltickets,
  getAllHalltickets,
  getHallticketsById,
  hallticketFiltering,
  getSubwiseTotalMarks,
  addScholasticMarks,
  getScholasticMarksById,
  getAllScholasticMarks,
  filterScholasticMarksClasswise,
  filterScholasticMarksStudentwise,
  updateScholasticMarks,
  deleteScholasticMarks,
};
