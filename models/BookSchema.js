const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema(
  {
    schoolId: String,
    bookName: {
      type: String,
      required: true,
    },
    author: {
      type: String,
    },
    genre: {
      type: String,
    },
    language: {
      type: String,
    },
    year: {
      type: String,
    },
    barcode: {
      type: String,
    },
    refSubject: {
      type: String,
    },
    availabilityStatus: {
      type: String,
    },
    refNo: {
      type: Number,
    },
    IsbnNo: {
      type: String,
    },
    description: {
      type: String,
    },
    students: {
      currentlyIssued: String,
      issueList: [String],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    coverImage: {
      public_id: String,
      url: String,
    },
    imageId: {
      type: String,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {timestamps: true}
);

const book = mongoose.model('Book', bookSchema);
module.exports = book;
