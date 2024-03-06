const busModel = require("../../models/Transportation/BusSchema");
const studentModel = require("../../models/studentSchema");
const cloudinary = require("../../config/cloudinary");

const addBusDetails = async (req, res) => {
  try {
    const data = req.body;
    const { FC, RC } = data;
    let cloudFCId = {};
    let cloudRCId = {};
    if (FC) {
      const cloudFCImage = await cloudinary.uploader.upload(data.FC, {
        resource_type: "auto",
        folder: "eelonSchoolManagementApp/School-Bus/FCpdfs",
      });
      cloudFCId = {
        public_id: cloudFCImage.public_id,
        url: cloudFCImage.secure_url,
      };
    }
    if (RC) {
      const cloudRCImage = await cloudinary.uploader.upload(data.RC, {
        resource_type: "auto",
        folder: "eelonSchoolManagementApp/School-Bus/RCpdfs",
      });
      cloudRCId = {
        public_id: cloudRCImage.public_id,
        url: cloudRCImage.secure_url,
      };
    }

    const result = await busModel.create({
      ...data,
      FC: cloudFCId,
      RC: cloudRCId,
    });
    if (!result)
      return res
        .status(400)
        .json({ message: "Error adding data", success: false });
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

const getAllBusDetails = async (req, res) => {
  try {
    const result = await busModel.find();
    if (!result)
      return res.status(400).json({ message: "No data found", success: false });
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

const getBusDetails = async (req, res) => {
  try {
    const result = await busModel.findById(req.params.id);
    if (!result)
      return res.status(400).json({ message: "No data found", success: false });
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

const deleteBusDetails = async (req, res) => {
  try {
    const { publicIds } = req.body;
    if (publicIds.length === 0) {
      await cloudinary.api.delete_resources(publicIds);
    }
    const result = await busModel.findByIdAndDelete(req.params.id);
    if (!result)
      return res.status(400).json({ message: "No data found", success: false });
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

const updateBusDetails = async (req, res) => {
  try {
    const data = req.body;
    const result = await busModel.findByIdAndUpdate(req.params.id, data);
    if (!result)
      return res.status(400).json({ message: "No data found", success: false });
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

const busFiltering = async (req, res) => {
  const { busNo, rgNo, vehicleModel, driverName, status } = req.body;
  try {
    const pipeline = [];

    if (busNo) {
      pipeline.push({
        $match: { busNo: { $regex: new RegExp(busNo, "i") } },
      });
    }
    if (rgNo) {
      pipeline.push({ $match: { rgNo: rgNo } });
    }
    if (vehicleModel) {
      pipeline.push({ $match: { vehicleModel: vehicleModel } });
    }
    if (driverName) {
      pipeline.push({ $match: { driverName: driverName } });
    }
    if (status) {
      pipeline.push({ $match: { status: status } });
    }

    const result = await busModel.aggregate(pipeline);

    if (!result) return res.status(404).json({ message: "No data found" });
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

const busStudentFiltering = async (req, res) => {
  const { rgNo } = req.body;
  try {
    const pipeline = [];

    if (rgNo) {
      pipeline.push({ $match: { rgNo: rgNo } });
    }

    const result = await busModel.aggregate([
      {
        $match: { rgNo: rgNo },
      },
    ]);
    if (result.length === 0)
      return res.status(404).json({ message: "No data found", success: false });
    const busId = result[0]?._id.toString();

    const students = await studentModel.aggregate([
      {
        $match: { busId: busId },
      },
    ]);

    res.status(200).json({ busData: result, students });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

const addComplaints = async (req, res) => {
  try {
    const { complaintsArray } = req.body;
    if (!complaintsArray)
      return res.status(400).json({ message: "No data sent", success: false });
    const result = await busModel.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { complaints: complaintsArray },
      },
      { new: true }
    );
    if (!result)
      return res
        .status(400)
        .json({ message: "Error adding complaints", success: false });
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
  }
};

const updateComplaints = async (req, res) => {
  try {
    const { complaintsArray, complaintId } = req.body;
    if (!complaintsArray || !complaintId)
      return res.status(400).json({ message: "No data sent", success: false });
    const result = await busModel.aggregate([
      {
        $match: {
          _id: req.params.id,
        },
      },
    ]);
    if (!result)
      return res
        .status(400)
        .json({ message: "Error adding complaints", success: false });
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  addBusDetails,
  getAllBusDetails,
  getBusDetails,
  deleteBusDetails,
  updateBusDetails,
  busFiltering,
  busStudentFiltering,
  addComplaints,
  updateComplaints,
  updateComplaints,
};
