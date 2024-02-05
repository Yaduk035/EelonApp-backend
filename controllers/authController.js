const Admin = require("../models/adminModel");
const Staff = require("../models/staffSchema");
const Student = require("../models/studentSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleAdminLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email | !password)
    return res.status(400).json({ message: "email and password required." });

  const foundUser = await Admin.findOne({ email: email }).exec();
  if (!foundUser)
    return res
      .status(404)
      .json({ message: `username ${email} not found`, success: false });

  //   const pwdMatch = await bcrypt.compare(pwd, foundUser.password);
  //   if (pwdMatch) {
  //     const roles = await Object.values(foundUser.roles).filter(Boolean);
  //     const firstname = foundUser?.firstname;
  //     const userId = foundUser?._id;
  //     const lastname = foundUser?.lastname;
  if (password !== foundUser.password) {
    return res
      .status(401)
      .json({ message: "Password donot match", success: false });
  } else {
    const roles = Object.values(foundUser.roles).filter(Boolean);
    const accessToken = jwt.sign(
      {
        UserInfo: {
          email: foundUser.email,
          roles: foundUser.roles,
          userId: foundUser._id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { email: foundUser.email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "15d" }
    );

    foundUser.refreshToken = refreshToken;
    const email = foundUser?.email;
    const userId = foundUser?._id;
    const result = await foundUser.save();
    console.log(result);
    // console.log(roles);

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      accessToken,
      roles,
      email,
      userId,
      message: "Logged in succesfully",
      success: true,
    });
  }
  //   } else {
  //     res.status(401).json({ error: "Error" });
  //   }
};

const handleStaffLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email | !password)
    return res.status(400).json({ message: "email and password required." });

  const foundUser = await Staff.findOne({ email: email }).exec();
  if (!foundUser)
    return res
      .status(404)
      .json({ message: `username ${email} not found`, success: false });

  //   const pwdMatch = await bcrypt.compare(pwd, foundUser.password);
  //   if (pwdMatch) {
  //     const roles = await Object.values(foundUser.roles).filter(Boolean);
  //     const firstname = foundUser?.firstname;
  //     const userId = foundUser?._id;
  //     const lastname = foundUser?.lastname;
  if (password !== foundUser.password) {
    return res
      .status(401)
      .json({ message: "Password donot match", success: false });
  } else {
    const roles = Object.values(foundUser.roles).filter(Boolean);
    const accessToken = jwt.sign(
      {
        UserInfo: {
          email: foundUser.email,
          roles: foundUser.roles,
          userId: foundUser._id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { email: foundUser.email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "15d" }
    );

    foundUser.refreshToken = refreshToken;
    const email = foundUser?.email;
    const userId = foundUser?._id;

    const result = await foundUser.save();
    console.log(result);
    // console.log(roles);

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      accessToken,
      roles,
      email,
      userId,
      message: "Logged in succesfully",
      success: true,
    });
  }
  //   } else {
  //     res.status(401).json({ error: "Error" });
  //   }
};

const handleStudentLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email | !password)
    return res.status(400).json({ message: "email and password required." });

  const foundUser = await Student.findOne({ email: email }).exec();
  if (!foundUser)
    return res
      .status(404)
      .json({ message: `username ${email} not found`, success: false });

  //   const pwdMatch = await bcrypt.compare(pwd, foundUser.password);
  //   if (pwdMatch) {
  //     const roles = await Object.values(foundUser.roles).filter(Boolean);
  //     const firstname = foundUser?.firstname;
  //     const userId = foundUser?._id;
  //     const lastname = foundUser?.lastname;
  if (password !== foundUser.password) {
    return res
      .status(401)
      .json({ message: "Password donot match", success: false });
  } else {
    const roles = Object.values(foundUser.roles).filter(Boolean);
    const accessToken = jwt.sign(
      {
        UserInfo: {
          email: foundUser.email,
          roles: foundUser.roles,
          userId: foundUser._id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { email: foundUser.email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "15d" }
    );

    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();
    const email = foundUser?.email;
    const userId = foundUser?._id;

    console.log(result);
    // console.log(roles);

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      accessToken,
      roles,
      email,
      userId,
      message: "Logged in succesfully",
      success: true,
    });
  }
  //   } else {
  //     res.status(401).json({ error: "Error" });
  //   }
};

module.exports = { handleAdminLogin, handleStaffLogin, handleStudentLogin };
