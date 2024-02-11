const librarySettings = require("../models/LibraryDropdowns");

const updateGenreDropdown = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) return res.status(400).json({ message: "No id sent" });
    const genreData = req.body;
    if (!genreData) return res.status(400).json({ message: "No data sent" });
    const genre = await librarySettings.findByIdAndUpdate(id, genreData);
    res.status(200).json(genre);
  } catch (error) {
    console.log(error);
  }
};

const AddGenreDropdown = async (req, res) => {
  try {
    const data = req.body;
    if (!data)
      return res
        .status(400)
        .json({ message: "No data sent with body", success: false });
    const genre = await librarySettings.create(data);
    if (!genre)
      return res.status(400).json({ message: "Error creating genre" });
    res.status(201).json(genre);
  } catch (error) {
    console.log(error);
  }
};

const getGenreDropdown = async (req, res) => {
  try {
    const dropdownData = await librarySettings.find().exec();
    if (!dropdownData)
      return res.status(404).json({ message: "No data found", success: false });
    res.status(200).json(dropdownData);
  } catch (error) {
    console.log(error);
  }
};

const deleteGenre = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteSetting = await librarySettings.findByIdAndDelete(id);
    if (!deleteSetting)
      return res.status(404).json({ message: "No data found", success: false });
    res.status(200).json({ message: `Setting with id ${id} deleted` });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  AddGenreDropdown,
  updateGenreDropdown,
  getGenreDropdown,
  deleteGenre,
};
