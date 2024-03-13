const librarySettings = require('../models/LibraryDropdowns');
const schoolModel = require('../models/schoolModel');
const mongoose = require('mongoose');
const {ObjectId} = mongoose.Types;

const AddGenreDropdown = async (req, res) => {
  try {
    const data = req.body;
    const {schoolId} = data;
    if (!data) return res.status(400).json({message: 'No data sent with body', success: false});
    const genre = await schoolModel.findByIdAndUpdate(
      schoolId,
      {
        $addToSet: {libraryGenre: data},
      },
      {new: true}
    );
    if (!genre) return res.status(400).json({message: 'Error creating genre'});
    res.status(201).json(genre);
  } catch (error) {
    console.log(error);
  }
};

const getGenreDropdown = async (req, res) => {
  try {
    const {schoolId} = req.body;
    const dropdownData = await schoolModel
      .aggregate([
        {
          $match: {_id: new ObjectId(schoolId)},
        },
        {
          $project: {
            _id: 0,
            libraryGenre: 1,
          },
        },
      ])
      .exec();
    if (dropdownData.length === 0) return res.status(400).json({message: 'No data found'});
    res.status(200).json(...dropdownData);
  } catch (error) {
    console.log(error);
  }
};

const getAllGenreDropdown = async (req, res) => {
  try {
    const dropdownData = await schoolModel
      .aggregate([
        {
          $project: {
            libraryGenre: 1,
          },
        },
      ])
      .exec();
    if (dropdownData.length === 0) return res.status(400).json({message: 'No data found'});
    res.status(200).json(dropdownData);
  } catch (error) {
    console.log(error);
  }
};

const deleteGenre = async (req, res) => {
  try {
    const {schoolId, genreId} = req.body;
    const deleteSetting = await schoolModel.findByIdAndUpdate(schoolId, {
      $pull: {libraryGenre: {_id: genreId}},
    });
    if (!deleteSetting) return res.status(404).json({message: 'No data found', success: false});
    res.status(200).json({message: `Setting deleted`});
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  AddGenreDropdown,
  getGenreDropdown,
  deleteGenre,
  getAllGenreDropdown,
};
