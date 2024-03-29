const jwt = require('jsonwebtoken');
const studentModel = require('../models/studentSchema');
const staffModel = require('../models/staffSchema');
const adminModel = require('../models/adminModel');
const superAdminModel = require('../models/superAdminModel');

const handleStudentRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  console.log('RT : ', refreshToken);

  const foundUser = await studentModel.findOne({refreshToken}).exec();
  console.log('Found User : ', foundUser?.email);
  if (!foundUser) return res.sendStatus(404);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.email !== decoded.email) return res.sendStatus(403);

    const roles = Object.values(foundUser.roles);
    const accessToken = jwt.sign(
      {
        UserInfo: {
          email: decoded?.email,
          roles: roles,
          userId: decoded?.userId,
          profilePic: foundUser?.profilePic?.url,
          schoolId: decoded?.schoolId,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {expiresIn: '15m'}
    );
    res.json({roles, accessToken});
  });
};

const handleStaffRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  console.log('RT : ', refreshToken);

  const foundUser = await staffModel.findOne({refreshToken}).exec();
  console.log('Found User : ', foundUser?.email);
  if (!foundUser) return res.sendStatus(404);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.email !== decoded.email) return res.sendStatus(403);

    const roles = Object.values(foundUser.roles);
    const accessToken = jwt.sign(
      {
        UserInfo: {
          email: decoded?.email,
          roles: roles,
          userId: decoded?.userId,
          profilePic: foundUser?.profilePic?.url,
          schoolId: decoded?.schoolId,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {expiresIn: '15m'}
    );
    res.json({roles, accessToken});
  });
};

const handleAdminRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  console.log('RT : ', refreshToken);

  const foundUser = await adminModel.findOne({refreshToken}).exec();
  console.log('Found User : ', foundUser?.email);
  if (!foundUser) return res.sendStatus(404);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.email !== decoded.email) return res.sendStatus(403);

    const roles = Object.values(foundUser.roles);
    const accessToken = jwt.sign(
      {
        UserInfo: {
          email: decoded?.email,
          roles: roles,
          userId: decoded?.userId,
          profilePic: foundUser?.profilePic?.url,
          schoolId: decoded?.schoolId,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {expiresIn: '15m'}
    );
    res.json({roles, accessToken});
  });
};

const handleSuperAdminRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  console.log('RT : ', refreshToken);

  const foundUser = await superAdminModel.findOne({refreshToken}).exec();
  console.log('Found User : ', foundUser?.email);
  if (!foundUser) return res.sendStatus(404);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.email !== decoded.email) return res.sendStatus(403);

    const roles = Object.values(foundUser.roles);
    const accessToken = jwt.sign(
      {
        UserInfo: {
          email: decoded?.email,
          roles: roles,
          userId: decoded?.userId,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {expiresIn: '15m'}
    );
    res.json({roles, accessToken});
  });
};
module.exports = {
  handleStudentRefreshToken,
  handleStaffRefreshToken,
  handleAdminRefreshToken,
  handleSuperAdminRefreshToken,
};
