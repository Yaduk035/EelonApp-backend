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
    const { name, password } = req.body;
    if (!name && !password)
      return res.status(400).json({ error: "No data sent" });
    try {
      const results = await User.create({ name, password });
      console.log(results);
      res.status(201).json({ message: "User created" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Server error" });
    }

    res.status(200).json({ message: "User created" });
  } catch (error) {
    console.log(error);
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
