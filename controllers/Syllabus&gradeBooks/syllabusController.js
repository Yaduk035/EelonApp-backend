const syllabusModel = require('../../models/Lesson-planning/syllabus');

const addSyllabus = async (req, res) => {
  try {
    const data = req.body;
    if (!data) return res.status(400).json({message: 'No data sent', success: false});
    const result = await syllabusModel.create(data);
    if (!result) return res.status(400).json({message: 'Error creating data', success: false});
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

const updateSyllabus = async (req, res) => {
  try {
    const data = req.body;
    if (!data) return res.status(400).json({message: 'No data sent', success: false});
    const result = await syllabusModel.findByIdAndUpdate(req.params.id, data, {new: true});
    if (!result) return res.status(400).json({message: 'Error updating data', success: false});
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

const deleteSyllabus = async (req, res) => {
  try {
    const {publicIdArray} = req.body;

    if (publicIdArray) {
      await cloudinary.api.delete_resources(publicIdArray);
    }

    const result = await syllabusModel.findByIdAndDelete(req.params.id);
    if (!result) return res.status(400).json({message: 'Error deleting data', success: false});
    res.status(201).json({message: 'Syllabus deleted', success: true});
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

const getAllSyllabus = async (req, res) => {
  try {
    const result = await syllabusModel.find().exec();
    if (!result) return res.status(400).json({message: 'Error fetching data', success: false});
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

const getSyllabus = async (req, res) => {
  try {
    const result = await syllabusModel.findById(req.params.id).exec();
    if (!result) return res.status(400).json({message: 'Error fetching data', success: false});
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

const addSyllabusContent = async (req, res) => {
  try {
    let data = req.body;
    if (!data) return res.status({message: 'No data sent', success: false});
    const {contentType} = data;

    if (contentType === 'pdf') {
      const cloudImage = await cloudinary.uploader.upload(data.pdfB64, {
        resource_type: 'auto',
        folder: 'eelonSchoolManagementApp/classMaterials/pdfs',
      });
      const cloudId = {
        public_id: cloudImage.public_id,
        url: cloudImage.secure_url,
      };
      data = {...data, pdf: cloudId};
    }

    if (contentType === 'ppt') {
      const cloudImage = await cloudinary.uploader.upload(data.pdfB64, {
        resource_type: 'auto',
        folder: 'eelonSchoolManagementApp/classMaterials/ppts',
      });
      const cloudId = {
        public_id: cloudImage.public_id,
        url: cloudImage.secure_url,
      };
      data = {...data, pdf: cloudId};contentType
    }

    const result = await syllabusModel.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: {contents: data},
      },
      {new: true}
    );
    if (!result) return res.status(400).json({message: 'Error updating syllabus', success: false});
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

const removeSyllabusContent = async (req, res) => {
  try {
    let data = req.body;
    const {pdfPublicId, pptPublicId, contentId} = data;

    if (!data) return res.status({message: 'No data sent', success: false});
    if (!contentId) return res.status({message: 'No content id sent', success: false});

    if (pdfPublicId) {
      await cloudinary.uploader.destroy(pdfPublicId);
    }
    if (pptPublicId) {
      await cloudinary.uploader.destroy(pptPublicId);
    }

    const result = await syllabusModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {contents: {_id: contentId}},
      },
      {new: true}
    );
    if (!result) return res.status(400).json({message: 'Error updating syllabus', success: false});
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

const syllabusFiltering = async (req, res) => {
  const {term, academicYear, teacherId, studyRoomId, subject, std, unitName} = req.body;
  try {
    const pipeline = [];

    if (unitName) {
      pipeline.push({
        $match: {unitName: {$regex: new RegExp(unitName, 'i')}},
      });
    }
    if (term) {
      pipeline.push({$match: {term: term}});
    }
    if (academicYear) {
      pipeline.push({$match: {academicYear: academicYear}});
    }
    if (teacherId) {
      pipeline.push({$match: {teacherId: teacherId}});
    }
    if (studyRoomId) {
      pipeline.push({$match: {studyRoomId: studyRoomId}});
    }
    if (subject) {
      pipeline.push({$match: {subject: subject}});
    }
    if (std) {
      pipeline.push({$match: {std: std}});
    }

    const result = await syllabusModel.aggregate(pipeline);

    if (result.length === 0) return res.status(404).json({message: 'No data found'});
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

const syllabusDropdown = async (req, res) => {
  try {
    const result = await syllabusModel.aggregate([
      {
        $match: {studyRoomId: req.params.id},
      },
      {
        $project: {
          _id: 1,
          unitName: 1,
          pageNo: 1,
          term: 1,
          teacherId: 1,
        },
      },
    ]);
    if (result.length === 0) return res.status(400).json({message: 'No data found', success: false});
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

module.exports = {
  addSyllabus,
  updateSyllabus,
  deleteSyllabus,
  getAllSyllabus,
  getSyllabus,
  addSyllabusContent,
  removeSyllabusContent,
  syllabusFiltering,
  syllabusDropdown,
};
