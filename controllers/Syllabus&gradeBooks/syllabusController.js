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
      data = {...data, pdf: cloudId};
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

module.exports = {addSyllabus, updateSyllabus, deleteSyllabus, getAllSyllabus, getSyllabus, addSyllabusContent, removeSyllabusContent};
