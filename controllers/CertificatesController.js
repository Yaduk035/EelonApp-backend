const staffModel = require("../models/staffSchema");
const cloudinary = require("../config/cloudinary");

const addExperiencePdfs = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const cloudImage = await cloudinary.uploader.upload(data.pdfB64, {
      resource_type: "auto",
      folder: "eelonSchoolManagementApp/Staff-workexperience/pdfs",
    });

    // console.log(cloudImage.secure_url);
    // console.log(cloudImage.public_id);
    const cloudId = {
      public_id: cloudImage.public_id,
      url: cloudImage.secure_url,
    };
    const result = await staffModel.findByIdAndUpdate(
      id,
      {
        $addToSet: {
          workExperienceArray: {
            ...data,
            pdf: cloudId,
          },
        },
      },
      { new: true }
    );

    if (!result)
      return res
        .status(400)
        .json({ message: "Error uploading data", success: false });
    res.status(201).json({ message: "Upload successfull", success: true });
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

module.exports = { addExperiencePdfs };
