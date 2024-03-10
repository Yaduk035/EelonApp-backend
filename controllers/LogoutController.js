const AdminModel = require('../models/adminModel');
const StaffModel = require('../models/staffSchema');
const StudentModel = require('../models/studentSchema');
const SuperAdminModel = require('../models/superAdminModel');

const handleAdminLogout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;

  const foundUser = await AdminModel.findOne({refreshToken}).exec();
  if (!foundUser) {
    res.clearCookie('jwt', {httpOnly: true, sameSite: 'none', secure: false});
    return res.sendStatus(204);
  }

  foundUser.refreshToken = '';
  const result = await foundUser.save();
  console.log('User logged out');

  res.clearCookie('jwt', {httpOnly: true, sameSite: 'none', secure: false});
  return res.sendStatus(204);
};

const handleStaffLogout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;

  const foundUser = await StaffModel.findOne({refreshToken}).exec();
  if (!foundUser) {
    res.clearCookie('jwt', {httpOnly: true, sameSite: 'none', secure: false});
    return res.sendStatus(204);
  }

  foundUser.refreshToken = '';
  const result = await foundUser.save();
  console.log('User logged out');

  res.clearCookie('jwt', {httpOnly: true, sameSite: 'none', secure: false});
  return res.sendStatus(204);
};

const handleStudentLogout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;

  const foundUser = await StudentModel.findOne({refreshToken}).exec();
  if (!foundUser) {
    res.clearCookie('jwt', {httpOnly: true, sameSite: 'none', secure: false});
    return res.sendStatus(204);
  }

  foundUser.refreshToken = '';
  const result = await foundUser.save();
  console.log('User logged out');

  res.clearCookie('jwt', {httpOnly: true, sameSite: 'none', secure: false});
  return res.sendStatus(204);
};

const handleSuperAdminLogout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;

  const foundUser = await SuperAdminModel.findOne({refreshToken}).exec();
  if (!foundUser) {
    res.clearCookie('jwt', {httpOnly: true, sameSite: 'none', secure: false});
    return res.sendStatus(204);
  }

  foundUser.refreshToken = '';
  const result = await foundUser.save();
  console.log('User logged out');

  res.clearCookie('jwt', {httpOnly: true, sameSite: 'none', secure: false});
  return res.sendStatus(204);
};

module.exports = {handleAdminLogout, handleStaffLogout, handleStudentLogout, handleSuperAdminLogout};
