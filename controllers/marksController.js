const examMarksModel = require("../models/ExamDb/examMarksModel");
const studentModel = require("../models/studentSchema");

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
const filterMarksClasswise = async (req, res) => {
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
//     const studentId = req.params.id;
//     const { classSection, academicYear } = req.body;

//     // const student = await studentModel.find;

//     const pipeline = [
//       // Match documents containing the specified studentId in marksArray
//       {
//         $match: {
//           academicYear: academicYear,
//           classSection: classSection,
//         },
//       },
//       // Unwind marksArray to work with individual marks
//       // { $unwind: "$subject" },
//       { $unwind: "$marksArray" },
//       {
//         $group: {
//           _id: "$marksArray.studentId",
//           studentName: { $first: "$marksArray.studentName" },
//           marks: {
//             $push: {
//               subject: "$subject",
//               internal: "$marksArray.internal",
//               external: "$marksArray.external",
//               total: "$marksArray.total",
//             },
//           },
//         },
//       },
//     ];

//     const result = await examMarksModel.aggregate(pipeline);
//     res.status(200).json(result);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error", success: false });
//   }
// };

const filterMarksStudentwise = async (req, res) => {
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

// const filterMarksClasswise = async (req, res) => {
//   try {
//     const result = await examMarksModel.aggregate([
//       {
//         $match: {
//           classSection: "10-B",
//           academicYear: "2023-2024",
//           term: "I midterm",
//         },
//       },
//       {
//         $addFields: {
//           "marksArray.MathsTotal": "$$REMOVE", // Remove any existing MathsTotal field
//         },
//       },
//       // Calculate MathsTotal for each student
//       {
//         $addFields: {
//           "marksArray.MathsTotal": {
//             $sum: "$marksArray.total",
//           },
//         },
//       },
//       // Lookup English marks and join them with existing documents based on studentId
//       {
//         $lookup: {
//           from: "Marks",
//           let: { studentId: "$marksArray.studentId" },
//           pipeline: [
//             {
//               $match: {
//                 $expr: { $eq: ["$marksArray.studentId", "$$studentId"] },
//                 subject: "English",
//               },
//             },
//             {
//               $project: {
//                 _id: 0,
//                 studentId: "$marksArray.studentId",
//                 EnglishTotal: "$marksArray.total",
//               },
//             },
//           ],
//           as: "englishMarks",
//         },
//       },
//       // Unwind the englishMarks array
//       { $unwind: { path: "$englishMarks", preserveNullAndEmptyArrays: true } },
//       // Add EnglishTotal to marksArray documents
//       {
//         $addFields: {
//           "marksArray.EnglishTotal": "$englishMarks.EnglishTotal",
//         },
//       },
//       // Group the documents by _id to reconstruct the document structure
//       {
//         $group: {
//           _id: "$_id",
//           classSection: { $first: "$classSection" },
//           academicYear: { $first: "$academicYear" },
//           examType: { $first: "$examType" },
//           term: { $first: "$term" },
//           marksArray: { $push: "$marksArray" },
//         },
//       },
//       // Project to reshape the document and remove unnecessary fields
//       {
//         $project: {
//           _id: 0,
//           classSection: 1,
//           academicYear: 1,
//           examType: 1,
//           term: 1,
//           marksArray: 1,
//         },
//       },
//     ]);
//     if (!result) res.status(400).json({ message: "No results found" });
//     res.status(200).json(result);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

module.exports = {
  addMarks,
  getAllMarks,
  getMarksById,
  updateMarks,
  deleteMarks,
  filterMarksSubwise,
  filterMarksClasswise,
  filterMarksStudentwise,
};
