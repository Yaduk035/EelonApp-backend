const User = require("../models/user");

const getUsers = async (req, res) => {
  try {
    const users = await User.find().exec();
    if (!users) return res.status(400).json({ error: "No users found." });
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

const addUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ error: "Username and password must not be empty" });
    const duplicateUser = await User.findOne({ email: email }).exec();
    if (duplicateUser)
      return res.status(409).json({ error: "Username already exists" });
    const results = await User.create({ email, password });
    console.log(results);
    res.status(201).json({ message: "User created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

const deleteUsers = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndDelete(id);
    if (!user)
      return res.status(400).json({ error: `User with id ${id} deleted` });
    res.status(200).json({ message: `User with id ${id} deleted` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getUsers,
  addUser,
  deleteUsers,
};
