const Books = require('../models/BookSchema');
const Students = require('../models/studentSchema');
const cloudinary = require('../config/cloudinary');

const getAllBooks = async (req, res) => {
  try {
    const books = await Books.find().exec();
    if (!books) return res.status(204).json('No books found');
    res.status(200).json(books);
  } catch (error) {
    console.log(error);
    res.status(500).json({error: 'Server error'});
  }
};

const filterBooks = async (req, res) => {
  try {
    const {bookName, schoolId, year} = req.body;
    const pipeline = [];

    if (bookName) {
      pipeline.push({$match: {bookName: bookName}});
    }
    if (schoolId) {
      pipeline.push({$match: {schoolId: schoolId}});
    }
    if (year) {
      pipeline.push({$match: {year: year}});
    }

    const response = await Books.aggregate(pipeline);

    if (response.length === 0) return res.status(400).json({message: 'No users found.', success: false});
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({error: 'Server error'});
  }
};

const getBook = async (req, res) => {
  try {
    if (!req.params.id) return res.status(400).json({error: 'No id sent'});
    const book = await Books.findById(req.params.id);
    if (!book)
      return res.status(204).json({
        error: `Book with id ${req.params.id} not found in database.`,
      });
    res.status(200).json(book);
  } catch (error) {
    console.log(error);
    res.status(500).json({error: 'Server error'});
  }
};

const deleteBook = async (req, res) => {
  try {
    if (!req.params.id) return res.status(204).json({error: 'No id sent.'});
    const {public_id} = req.body;
    if (public_id) await cloudinary.uploader.destroy(public_id);
    const book = await Books.findByIdAndDelete(req.params.id);
    if (!book)
      return res.status(204).json({
        error: `Book with id ${req.params.id} not found in database.`,
      });
    res.status(200).json({message: `Book with id:${req.params.id} deleted`});
  } catch (error) {
    console.log(error);
    res.status(500).json({error: 'Server error'});
  }
};

const addBook = async (req, res) => {
  try {
    const data = req.body;
    if (!data?.bookName) return res.status(400).json({error: 'Some inputs fields are left empty.'});
    const {Image} = data;
    let cloudId = {};

    if (Image) {
      const cloudImage = await cloudinary.uploader.upload(Image, {
        folder: 'eelonSchoolManagementApp/library/book_cover-images',
      });

      cloudId = {
        public_id: cloudImage?.public_id,
        url: cloudImage?.url,
      };
    }

    const book = await Books.create({...data, coverImage: cloudId});
    if (!book) return res.status(400).json({message: 'Error adding book', success: false});
    res.status(201).json(book);
    console.log(book);
  } catch (error) {
    console.log(error);
    res.status(500).json({error: 'Server error'});
  }
};

const editBook = async (req, res) => {
  try {
    if (!req.params.id) return res.status(400).json({error: 'No id sent'});
    const data = req.body;

    const {Image} = data;
    let cloudId = {};

    if (Image) {
      const cloudImage = await cloudinary.uploader.upload(Image, {
        folder: 'eelonSchoolManagementApp/library/book_cover-images',
      });

      cloudId = {
        public_id: cloudImage?.public_id,
        url: cloudImage?.url,
      };
    }

    const book = await Books.findByIdAndUpdate(req.params.id, {...data, coverImage: cloudId}, {new: true}).exec();
    if (!book) return res.status(204).json({error: `Book with id:${req.params.id} not found`});
    res.status(200).json(book);
  } catch (error) {
    console.log(error);
    res.status(500).json({error: 'server error'});
  }
};

const bookIssueList = async (req, res) => {
  try {
    const bookId = req.params.id;
    if (!bookId) return res.status(400).json({message: 'No book id sent'});
    const {studentId} = req.body;
    if (!studentId) return res.status(400).json({message: 'No student id sent'});
    if (!bookId) return res.status(400).json({error: 'No book id sent'});
    const bookData = await Books.findById(bookId).exec();
    if (!bookData) {
      return res.status(400).json({error: `No book with id ${bookId} found.`});
    }
    const book = await Books.findById(bookId);
    book.students.currentlyIssued = studentId;
    await book.save();
    const bookIdArray = [bookId];
    const studentData = await Students.findByIdAndUpdate(
      studentId,
      {
        $addToSet: {
          booksIssued: {$each: bookIdArray},
          booksIssuedHistory: {$each: bookIdArray},
        },
      },
      {new: true}
    );

    res.status(200).json(book);
  } catch (error) {
    console.log(error);
    res.status(500).json({error: 'Server error.'});
  }
};

const bookUnIssueList = async (req, res) => {
  try {
    const bookId = req.params.id;
    if (!bookId) return res.status(400).json({message: 'No book id sent'});
    const {studentId} = req.body;
    if (!bookId) return res.status(400).json({error: 'No book id sent'});
    const bookData = await Books.findById(bookId).exec();
    if (!bookData) {
      return res.status(400).json({error: `No book with id ${bookId} found.`});
    }
    const book = await Books.findByIdAndUpdate(bookId, {
      students: {currentlyIssued: ''},
    });

    const studentDb = await Students.findByIdAndUpdate(
      studentId,
      {
        $pull: {
          booksIssued: bookId,
        },
      },
      {new: true}
    );

    res.status(200).json(book);
  } catch (error) {
    console.log(error);
    res.status(500).json({error: 'Server error.'});
  }
};

const getBookByName = async (req, res) => {
  try {
    if (!req.params.id) return res.status(400).json({error: 'No book name sent'});
    const book = await Books.find({
      $or: [{bookName: {$regex: new RegExp(req.params.id, 'i')}}, {genre: {$regex: new RegExp(req.params.id, 'i')}}],
    });
    if (!book)
      return res.status(204).json({
        error: `Book with name ${req.params.id} not found in database.`,
      });
    res.status(200).json(book);
  } catch (error) {
    console.log(error);
    res.status(500).json({error: 'Server error'});
  }
};

const getBookByGenre = async (req, res) => {
  try {
    if (!req.params.id) return res.status(400).json({error: 'No book name sent'});
    const book = await Books.find({
      genre: {$regex: new RegExp(`^${req.params.id}$`, 'i')},
    });
    if (!book)
      return res.status(204).json({
        error: `Book with name ${req.params.id} not found in database.`,
      });
    res.status(200).json(book);
  } catch (error) {
    console.log(error);
    res.status(500).json({error: 'Server error'});
  }
};

////////////////////  Library report routes   //////////////////////////////

const getBookCount = async (req, res) => {
  try {
    const {schoolId} = req.body;
    const count = await Books.countDocuments({schoolId: schoolId});
    if (!count) return res.status(400).json({message: 'No data', success: false});
    res.status(200).json(count);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server error', success: false});
  }
};

const getIssuedCount = async (req, res) => {
  try {
    const schoolId = req.body.schoolId; // Assuming schoolId is in the request body

    const count = await Books.aggregate([{$match: {schoolId: schoolId, 'students.currentlyIssued': {$exists: true, $ne: null}}}, {$count: 'issueCount'}]);

    if (!count.length || count[0].issueCount === 0) {
      return res.status(400).json({message: 'No data', success: false});
    }
    res.status(200).json(issueCount);
  } catch (error) {
    console.error(error);
  }
};

const genreCount = async (req, res) => {
  try {
    const {schoolId} = req.body;
    const count = await Books.aggregate([
      {
        $match: {
          schoolId: schoolId,
        },
      },
      {
        $group: {
          _id: '$genre',
          count: {$sum: 1},
        },
      },
    ]);
    // const formattedGenreCount = {};
    // count.forEach((genre) => {
    //   formattedGenreCount[genre._id] = genre.count;
    // });
    if (count.length === 0) return res.status(400).json({message: 'No data', success: false});
    res.status(200).json(count);
  } catch (error) {
    console.error(error);
  }
};

const getBooksByLimit = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const pipeline = [
      {
        $facet: {
          metadata: [
            {$count: 'totalBooks'},
            {
              $addFields: {
                totalPages: {$ceil: {$divide: ['$totalBooks', limit]}},
              },
            },
          ],
          books: [{$skip: startIndex}, {$limit: limit}],
        },
      },
      {
        $project: {
          books: 1,
          pagination: {
            totalPages: {$arrayElemAt: ['$metadata.totalPages', 0]},
            currentPage: page,
          },
        },
      },
    ];

    const result = await Books.aggregate(pipeline).exec();
    const {books, pagination} = result[0];

    if (!books || books.length === 0) return res.status(204).json('No books found');

    if (endIndex < pagination.totalBooks) {
      pagination.next = {
        page: page + 1,
        limit: limit,
      };
    }
    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit: limit,
      };
    }

    res.status(200).json({books, pagination});
  } catch (error) {
    console.log(error);
    res.status(500).json({error: 'Server error'});
  }
};

const getBooksByLimitFilter = async (req, res) => {
  try {
    const {schoolId} = req.body;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const pipeline = [
      {
        $match: {schoolId: schoolId},
      },
      {
        $facet: {
          metadata: [
            {$count: 'totalBooks'},
            {
              $addFields: {
                totalPages: {$ceil: {$divide: ['$totalBooks', limit]}},
              },
            },
          ],
          books: [{$skip: startIndex}, {$limit: limit}],
        },
      },
      {
        $project: {
          books: 1,
          pagination: {
            totalPages: {$arrayElemAt: ['$metadata.totalPages', 0]},
            currentPage: page,
          },
        },
      },
    ];

    const result = await Books.aggregate(pipeline).exec();
    const {books, pagination} = result[0];

    if (!books || books.length === 0) return res.status(204).json('No books found');

    if (endIndex < pagination.totalBooks) {
      pagination.next = {
        page: page + 1,
        limit: limit,
      };
    }
    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit: limit,
      };
    }

    res.status(200).json({books, pagination});
  } catch (error) {
    console.log(error);
    res.status(500).json({error: 'Server error'});
  }
};

module.exports = {
  getBook,
  getAllBooks,
  deleteBook,
  addBook,
  editBook,
  bookIssueList,
  getBookByName,
  bookUnIssueList,
  getBookByGenre,
  getBookCount,
  getIssuedCount,
  genreCount,
  getBooksByLimit,
  getBooksByLimitFilter,
  filterBooks,
};
