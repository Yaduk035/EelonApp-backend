const studentModel = require("../models/studentSchema");
const cloudinary = require("../config/cloudinary");

const addProfileImage = async (req, res) => {
  try {
    const studentId = req.params.id;
    const { Image } = req.body;
    // console.log(image);
    if (!Image)
      return res.status(400).json({ message: "No image sent", success: false });
    const cloudImage = await cloudinary.uploader.upload(Image, {
      folder: "eelonSchoolManagementApp/studentProfilePhotos",
    });
    console.log(cloudImage);
    const result = await studentModel.findByIdAndUpdate(studentId, {
      studentProfilePic: {
        public_id: cloudImage.public_id,
        url: cloudImage.url,
      },
    });
    if (!result || !cloudImage)
      return res
        .status(400)
        .json({ message: "Error uploading image", success: false });
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
  }
};

const deleteStudentProfileImg = async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await studentModel.findByIdAndUpdate(studentId, {
      studentProfilePic: null,
    });
    if (!student)
      res.status(400).json({ message: "Error deleting file", success: false });
    const cloudinaryPublicId = student.studentProfilePic.public_id;
    const cloudImg = await cloudinary.uploader.destroy(cloudinaryPublicId);
    res.status(201).json({ message: "Profile pic deleted", success: true });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  addProfileImage,
  deleteStudentProfileImg,
};
