const syllabusModel = require('../models/Lesson-planning/syllabusPlannningModel');
const QBModel = require('../models/Lesson-planning/questionBankModel');
const questionPatternModel = require('../models/Lesson-planning/questionPattern');
const questionPaperModel = require('../models/Lesson-planning/questionPaperModel');
const cloudinary = require('../config/cloudinary');

const addSyllabus = async (req, res) => {
  try {
    const data = req.body;
    const cloudImage = await cloudinary.uploader.upload(data.pdfB64, {
      resource_type: 'auto', // Set the resource type to 'auto' to let Cloudinary determine the file type
      folder: 'eelonSchoolManagementApp/syllabus/pdfs', // Optional: You can specify a folder in your Cloudinary account
    });

    // console.log(cloudImage.secure_url);
    // console.log(cloudImage.public_id);
    const cloudId = {
      public_id: cloudImage.public_id,
      url: cloudImage.secure_url,
    };
    const syllabus = await syllabusModel.create({
      ...data,
      pdf: cloudId,
    });
    if (!syllabus) return res.status(400).json({message: 'Error creating syllabus', success: false});
    res.status(201).json(syllabus);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

const getAllSyllabus = async (req, res) => {
  try {
    const syllabus = await syllabusModel.find().exec();
    if (!syllabus) return res.status(404).json({message: 'No syllabus found', success: false});
    res.status(200).json(syllabus);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

const getSyllabusById = async (req, res) => {
  try {
    const syllabus = await syllabusModel.findById(req.params.id).exec();
    if (!syllabus) return res.status(404).json({message: 'No syllabus found', success: false});
    res.status(200).json(syllabus);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

const syllabusFiltering = async (req, res) => {
  const {std, termName, year, subject, teacherName, teacherId, schoolId} = req.body;
  try {
    const pipeline = [];

    if (std) {
      pipeline.push({$match: {std: std}});
    }
    if (termName) {
      pipeline.push({$match: {termName: termName}});
    }
    if (year) {
      pipeline.push({$match: {year: year}});
    }
    if (subject) {
      pipeline.push({$match: {subject: subject}});
    }
    if (teacherName) {
      pipeline.push({$match: {teacherName: teacherName}});
    }
    if (teacherId) {
      pipeline.push({$match: {teacherId: teacherId}});
    }
    if (schoolId) {
      pipeline.push({$match: {schoolId: schoolId}});
    }

    const result = await syllabusModel.aggregate(pipeline);

    if (!result) return res.status(404).json({message: 'No data found'});
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

const removeSyllabus = async (req, res) => {
  try {
    const syllabusId = req.params.id;
    const cloudPublicId = req.body.publicId;
    const syllabus = await syllabusModel.findByIdAndDelete(syllabusId);
    if (!syllabus) return res.status(400).json({message: 'Error deleting syllabus', success: false});
    await cloudinary.uploader.destroy(cloudPublicId);
    res.status(201).json({message: 'Syllabus deleted', success: true});
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

const updateSyllabus = async (req, res) => {
  try {
    const syllabusId = req.params.id;
    const data = req.body;
    const syllabus = await syllabusModel.findByIdAndUpdate(syllabusId, data, {
      new: true,
    });
    if (!syllabus) return res.status(400).json({message: 'Error editing syllabus', success: false});
    res.status(201).json(syllabus);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////////

const addQBs = async (req, res) => {
  try {
    const data = req.body;
    const cloudImage = await cloudinary.uploader.upload(data.pdfB64, {
      resource_type: 'auto', // Set the resource type to 'auto' to let Cloudinary determine the file type
      folder: 'eelonSchoolManagementApp/Qbanks/pdfs', // Optional: You can specify a folder in your Cloudinary account
    });

    const cloudId = {
      public_id: cloudImage.public_id,
      url: cloudImage.secure_url,
    };

    const result = await QBModel.create({
      ...data,
      pdf: cloudId,
    });
    if (!result) return res.status(400).json({message: 'Error creating question bank', success: false});
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

const removeQB = async (req, res) => {
  try {
    const Id = req.params.id;
    const cloudPublicId = req.body.publicId;
    const result = await QBModel.findByIdAndDelete(Id);
    await cloudinary.uploader.destroy(cloudPublicId);
    if (!result) return res.status(400).json({message: 'Error deleting question bank', success: false});
    res.status(201).json({message: 'question bank deleted', success: true});
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

const updateQB = async (req, res) => {
  try {
    const Id = req.params.id;
    const data = req.body;
    const result = await QBModel.findByIdAndUpdate(Id, data, {
      new: true,
    });
    if (!result) return res.status(400).json({message: 'Error editing question bank', success: false});
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

const getAllQBs = async (req, res) => {
  try {
    const result = await QBModel.find().exec();
    if (!result) return res.status(404).json({message: 'No question banks found', success: false});
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

const getQBsById = async (req, res) => {
  try {
    const result = await QBModel.findById(req.params.id).exec();
    if (!result) return res.status(404).json({message: 'No question bank found', success: false});
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

const QBFiltering = async (req, res) => {
  const {std, termName, year, subject, teacherName, teacherId} = req.body;
  try {
    const pipeline = [];

    if (std) {
      pipeline.push({$match: {std: std}});
    }
    if (termName) {
      pipeline.push({$match: {termName: termName}});
    }
    if (year) {
      pipeline.push({$match: {year: year}});
    }
    if (subject) {
      pipeline.push({$match: {subject: subject}});
    }
    if (teacherName) {
      pipeline.push({$match: {teacherName: teacherName}});
    }
    if (teacherId) {
      pipeline.push({$match: {teacherId: teacherId}});
    }

    const result = await QBModel.aggregate(pipeline);

    if (!result) return res.status(404).json({message: 'No data found'});
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error', success: false});
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////
};

const addQuestionPattern = async (req, res) => {
  try {
    const data = req.body;
    const cloudImage = await cloudinary.uploader.upload(data.pdfB64, {
      resource_type: 'auto', // Set the resource type to 'auto' to let Cloudinary determine the file type
      folder: 'eelonSchoolManagementApp/Qpatterns/pdfs', // Optional: You can specify a folder in your Cloudinary account
    });

    const cloudId = {
      public_id: cloudImage.public_id,
      url: cloudImage.secure_url,
    };

    const result = await questionPatternModel.create({
      ...data,
      pdf: cloudId,
    });

    if (!result) return res.status(400).json({message: 'Error creating question pattern', success: false});
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

const removeQuestionPattern = async (req, res) => {
  try {
    const Id = req.params.id;
    const cloudPublicId = req.body.publicId;

    const result = await questionPatternModel.findByIdAndDelete(Id);
    await cloudinary.uploader.destroy(cloudPublicId);
    if (!result) return res.status(400).json({message: 'Error deleting question pattern', success: false});
    res.status(201).json({message: 'question pattern deleted', success: true});
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

const updateQuestionPattern = async (req, res) => {
  try {
    const Id = req.params.id;
    const data = req.body;
    const result = await questionPatternModel.findByIdAndUpdate(Id, data, {
      new: true,
    });
    if (!result) return res.status(400).json({message: 'Error editing question pattern', success: false});
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

const getAllQuestionPattern = async (req, res) => {
  try {
    const result = await questionPatternModel.find().exec();
    if (!result) return res.status(404).json({message: 'No question patterns found', success: false});
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

const getQuestionPatternById = async (req, res) => {
  try {
    const result = await questionPatternModel.findById(req.params.id).exec();
    if (!result) return res.status(404).json({message: 'No question patterns found', success: false});
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

const QuestionPatternFiltering = async (req, res) => {
  const {std, termName, year, subject, teacherName, teacherId} = req.body;
  try {
    const pipeline = [];

    if (std) {
      pipeline.push({$match: {std: std}});
    }
    if (termName) {
      pipeline.push({$match: {termName: termName}});
    }
    if (year) {
      pipeline.push({$match: {year: year}});
    }
    if (subject) {
      pipeline.push({$match: {subject: subject}});
    }
    if (teacherName) {
      pipeline.push({$match: {teacherName: teacherName}});
    }
    if (teacherId) {
      pipeline.push({$match: {teacherId: teacherId}});
    }

    const result = await questionPatternModel.aggregate(pipeline);

    if (!result) return res.status(404).json({message: 'No data found'});
    res.status(200).json(result);
  } catch (error) {
    console.error('Error filtering question bank:', error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////////

const addQuestionPaper = async (req, res) => {
  try {
    const data = req.body;
    const cloudImage = await cloudinary.uploader.upload(data.pdfB64, {
      resource_type: 'auto', // Set the resource type to 'auto' to let Cloudinary determine the file type
      folder: 'eelonSchoolManagementApp/Qpapers/pdfs', // Optional: You can specify a folder in your Cloudinary account
    });

    const cloudId = {
      public_id: cloudImage.public_id,
      url: cloudImage.secure_url,
    };

    const result = await questionPaperModel.create({
      ...data,
      pdf: cloudId,
    });

    if (!result) return res.status(400).json({message: 'Error creating question pattern', success: false});
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

const removeQuestionPaper = async (req, res) => {
  try {
    const Id = req.params.id;
    const cloudPublicId = req.body.publicId;

    const result = await questionPaperModel.findByIdAndDelete(Id);
    await cloudinary.uploader.destroy(cloudPublicId);

    if (!result) return res.status(400).json({message: 'Error deleting question paper', success: false});
    res.status(201).json({message: 'question paper deleted', success: true});
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

const updateQuestionPaper = async (req, res) => {
  try {
    const Id = req.params.id;
    const data = req.body;
    const result = await questionPaperModel.findByIdAndUpdate(Id, data, {
      new: true,
    });
    if (!result) return res.status(400).json({message: 'Error editing question paper', success: false});
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

const getAllQuestionPaper = async (req, res) => {
  try {
    const result = await questionPaperModel.find().exec();
    if (!result) return res.status(404).json({message: 'No question paper found', success: false});
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

const getQuestionPaperById = async (req, res) => {
  try {
    const result = await questionPaperModel.findById(req.params.id).exec();
    if (!result) return res.status(404).json({message: 'No question paper found', success: false});
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

const QuestionPaperFiltering = async (req, res) => {
  const {std, termName, year, subject, teacherName, teacherId} = req.body;
  try {
    const pipeline = [];

    if (std) {
      pipeline.push({$match: {std: std}});
    }
    if (termName) {
      pipeline.push({$match: {termName: termName}});
    }
    if (year) {
      pipeline.push({$match: {year: year}});
    }
    if (subject) {
      pipeline.push({$match: {subject: subject}});
    }
    if (teacherName) {
      pipeline.push({$match: {teacherName: teacherName}});
    }
    if (teacherId) {
      pipeline.push({$match: {teacherId: teacherId}});
    }

    const result = await questionPaperModel.aggregate(pipeline);

    if (!result) return res.status(404).json({message: 'No data found'});
    res.status(200).json(result);
  } catch (error) {
    console.error('Error filtering question paper:', error);
    res.status(500).json({message: 'Server error', success: false});
  }
};
////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = {
  addSyllabus,
  removeSyllabus,
  updateSyllabus,
  getAllSyllabus,
  getSyllabusById,
  syllabusFiltering,
  addQBs,
  removeQB,
  updateQB,
  getAllQBs,
  getQBsById,
  QBFiltering,
  addQuestionPattern,
  removeQuestionPattern,
  updateQuestionPattern,
  getAllQuestionPattern,
  getQuestionPatternById,
  QuestionPatternFiltering,
  addQuestionPaper,
  removeQuestionPaper,
  updateQuestionPaper,
  getQuestionPaperById,
  getAllQuestionPaper,
  QuestionPaperFiltering,
};
