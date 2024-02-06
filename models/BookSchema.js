const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema(
  {
    bookName: {
      type: String,
      required: true,
    },
    rentAmount: {
      type: Number,
    },
    author: {
      type: String,
    },
    genre: {
      type: String,
    },
    rentPeriod: {
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
    rentData: {
      type: Number,
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
    image: String,
    imageId: {
      type: String,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const book = mongoose.model("Book", bookSchema);
module.exports = book;
