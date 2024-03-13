const feeCollectionModel = require('../../models/Accounts/FeeCollectionsSchema');

const addFee = async (req, res) => {
  try {
    const data = req.body;
    const result = await feeCollectionModel.create(data);
    if (!result) return res.status(400).json({message: 'No data found', success: false});
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};
const getAllFeeCollections = async (req, res) => {
  try {
    const result = await feeCollectionModel.find().exec();
    if (!result) return res.status(404).json({message: 'No data found', success: false});
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

const filterFeeCollections = async (req, res) => {
  try {
    const {academicYear, schoolId, studentName, billDate, invoiceNo, admnNo, classSection} = req.body;
    const pipeline = [];

    if (academicYear) {
      pipeline.push({$match: {academicYear: academicYear}});
    }
    if (schoolId) {
      pipeline.push({$match: {schoolId: schoolId}});
    }
    if (billDate) {
      pipeline.push({$match: {billDate: billDate}});
    }
    if (invoiceNo) {
      pipeline.push({$match: {invoiceNo: invoiceNo}});
    }
    if (admnNo) {
      pipeline.push({$match: {admnNo: admnNo}});
    }
    if (classSection) {
      pipeline.push({$match: {classSection: classSection}});
    }
    if (studentName) {
      pipeline.push({
        $match: {studentName: {$regex: new RegExp(studentName, 'i')}},
      });
    }

    const response = await feeCollectionModel.aggregate(pipeline);

    if (response.length === 0) return res.status(400).json({message: 'No data found.', success: false});
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

const getFeeCollection = async (req, res) => {
  try {
    const result = await feeCollectionModel.findById(req.params.id).exec();
    if (!result) return res.status(404).json({message: 'No data found', success: false});
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

module.exports = {addFee, getAllFeeCollections, getFeeCollection, filterFeeCollections};
