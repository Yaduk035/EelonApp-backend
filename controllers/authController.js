const Admin = require('../models/adminModel');
const Staff = require('../models/staffSchema');
const Student = require('../models/studentSchema');
const superAdmin = require('../models/superAdminModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleAdminLogin = async (req, res) => {
  const {email, password} = req.body;
  if (!email | !password) return res.status(400).json({message: 'email and password required.'});

  const foundUser = await Admin.findOne({email: email}).exec();
  if (!foundUser) return res.status(404).json({message: `username ${email} not found`, success: false});
  console.log('Admin loggedIn');

  const pwdMatch = await bcrypt.compare(password, foundUser.password);
  if (pwdMatch) {
    const roles = await Object.values(foundUser.roles).filter(Boolean);
    const userId = foundUser?._id;
    const email = foundUser?.email;
    const profilePic = foundUser?.profilePic?.url;
    const schoolId = foundUser?.schoolId;

    const accessToken = jwt.sign(
      {
        UserInfo: {
          email: email,
          roles: roles,
          userId: userId,
          profilePic: profilePic,
          schoolId: schoolId,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {expiresIn: '15m'}
    );

    const refreshToken = jwt.sign({email: email, roles: roles, userId: userId, schoolId: schoolId}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '15d'});

    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({roles, accessToken, userId, email, profilePic, schoolId});
  } else {
    res.status(401).json({error: 'Error'});
  }
};
///////////////////////////////////////////////////////////

const handleStaffLogin = async (req, res) => {
  const {email, password} = req.body;
  if (!email | !password) return res.status(400).json({message: 'email and password required.'});

  const foundUser = await Staff.findOne({email: email}).exec();
  if (!foundUser) return res.status(404).json({message: `username ${email} not found`, success: false});
  console.log('Staff loggedIn');

  const pwdMatch = await bcrypt.compare(password, foundUser.password);
  if (pwdMatch) {
    const roles = await Object.values(foundUser.roles).filter(Boolean);
    const userId = foundUser?._id;
    const email = foundUser?.email;
    const profilePic = foundUser?.profilePic?.url;
    const schoolId = foundUser?.schoolId;

    const accessToken = jwt.sign(
      {
        UserInfo: {
          email: email,
          roles: roles,
          userId: userId,
          profilePic: profilePic,
          schoolId: schoolId,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {expiresIn: '15m'}
    );

    const refreshToken = jwt.sign({email: email, roles: roles, userId: userId, schoolId: schoolId}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '15d'});

    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({roles, accessToken, userId, email, profilePic, schoolId});
  } else {
    res.status(401).json({error: 'Error'});
  }
};

////////////////////////////////////////////

const handleStudentLogin = async (req, res) => {
  const {email, password} = req.body;
  if (!email | !password) return res.status(400).json({message: 'email and password required.'});

  const foundUser = await Student.findOne({email: email}).exec();
  if (!foundUser) return res.status(404).json({message: `username ${email} not found`, success: false});
  console.log('Student loggedIn');

  const pwdMatch = await bcrypt.compare(password, foundUser.password);
  if (pwdMatch) {
    const roles = await Object.values(foundUser.roles).filter(Boolean);
    const userId = foundUser?._id;
    const email = foundUser?.email;
    const profilePic = foundUser?.profilePic?.url;
    const schoolId = foundUser?.schoolId;

    const accessToken = jwt.sign(
      {
        UserInfo: {
          email: email,
          roles: roles,
          userId: userId,
          profilePic: profilePic,
          schoolId: schoolId,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {expiresIn: '15m'}
    );

    const refreshToken = jwt.sign({email: email, roles: roles, userId: userId, schoolId: schoolId}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '15d'});

    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({roles, accessToken, userId, email, profilePic, schoolId});
  } else {
    res.status(401).json({error: 'Error'});
  }
};

////////////////////////////////////////////

const handleSuperAdminLogin = async (req, res) => {
  const {email, password} = req.body;
  if (!email | !password) return res.status(400).json({message: 'email and password required.'});

  const foundUser = await superAdmin.findOne({email: email}).exec();
  if (!foundUser) return res.status(404).json({message: `username ${email} not found`, success: false});
  console.log('Super admin loggedIn');

  const pwdMatch = await bcrypt.compare(password, foundUser.password);
  if (pwdMatch) {
    const roles = await Object.values(foundUser.roles).filter(Boolean);
    const userId = foundUser?._id;
    const email = foundUser?.email;
    const accessToken = jwt.sign(
      {
        UserInfo: {
          email: email,
          roles: roles,
          userId: userId,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {expiresIn: '15m'}
    );

    const refreshToken = jwt.sign({email: email, roles: roles, userId: userId}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '15d'});

    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({roles, accessToken, userId, email});
  } else {
    res.status(401).json({error: 'Error'});
  }
};

module.exports = {handleAdminLogin, handleStaffLogin, handleStudentLogin, handleSuperAdminLogin};
