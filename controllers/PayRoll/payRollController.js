const payRollModel = require('../../models/Payroll/PayrollModel');

const createPayroll = async (req, res) => {
  try {
    const data = req.body;
    const result = await payRollModel.create(data);
    if (!result) return res.status(400).json({message: 'Error creating data', success: false});
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

// Retrieve all payroll records
const getAllPayrolls = async (req, res) => {
  try {
    const result = await payRollModel.find();
    if (!result) return res.status(400).json({message: 'Error fetching data', success: false});
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

// Retrieve a single payroll record by ID
const getPayrollById = async (req, res) => {
  try {
    const result = await payRollModel.findById(req.params.id);
    if (!result) return res.status(400).json({message: 'Error fetching data', success: false});
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

// Update a payroll record by ID
const updatePayroll = async (req, res) => {
  try {
    const data = req.body;
    const result = await payRollModel.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    if (!result) return res.status(400).json({message: 'Error updating data', success: false});
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

// Delete a payroll record by ID
const deletePayroll = async (req, res) => {
  try {
    const result = await payRollModel.findByIdAndDelete(req.params.id);
    if (!result) return res.status(400).json({message: 'Error deleting data', success: false});
    res.status(201).json({message: 'Payroll deleted', success: true});
  } catch (error) {
    console.log(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

const filterPayroll = async (req, res) => {
  try {
    const {
      payRollId,
      staffName,
      staffId,
      staffRole,
      staffType,
      baseSalary,
      adminDbId,
      schoolDbId,
      month,
      academicYear,
      dateIssued,
      basicSalary,
      basicSalaryStatus,
    } = req.body;

    const pipeline = [];
    if (payRollId) {
      pipeline.push({$match: {_id: payRollId.toString()}});
    }
    if (staffId) {
      pipeline.push({$match: {name: staffName}});
    }
    if (staffId) {
      pipeline.push({$match: {staffId: staffId}});
    }
    if (staffRole) {
      pipeline.push({$match: {staffRole: staffRole}});
    }
    if (staffType) {
      pipeline.push({$match: {staffType: staffType}});
    }
    if (baseSalary) {
      pipeline.push({$match: {baseSalary: baseSalary}});
    }
    if (adminDbId) {
      pipeline.push({$match: {adminDbId: adminDbId}});
    }
    if (schoolDbId) {
      pipeline.push({$match: {schoolDbId: schoolDbId}});
    }
    if (month) {
      pipeline.push({$match: {month: month}});
    }
    if (academicYear) {
      pipeline.push({$match: {academicYear: academicYear}});
    }
    if (dateIssued) {
      pipeline.push({$match: {dateIssued: dateIssued}});
    }
    if (basicSalary) {
      pipeline.push({$match: {basicSalary: basicSalary}});
    }
    if (basicSalaryStatus) {
      pipeline.push({$match: {basicSalaryStatus: basicSalaryStatus}});
    }

    const result = await payRollModel.aggregate(pipeline);
    if (result.length === 0) return res.status(404).json({message: 'No data found', success: false});
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

module.exports = {
  createPayroll,
  getAllPayrolls,
  getPayrollById,
  updatePayroll,
  deletePayroll,
  filterPayroll,
};
