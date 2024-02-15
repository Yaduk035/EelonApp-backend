const Books = require("../models/BookSchema");
const Students = require("../models/StudentSchema");

const getAllBooks = async (req, res) => {
  try {
    const books = await Books.find().exec();
    if (!books) return res.status(204).json("No books found");
    res.status(200).json(books);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

const getBook = async (req, res) => {
  try {
    if (!req.params.id) return res.status(400).json({ error: "No id sent" });
    const book = await Books.findById(req.params.id);
    if (!book)
      return res.status(204).json({
        error: `Book with id ${req.params.id} not found in database.`,
      });
    res.status(200).json(book);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

const deleteBook = async (req, res) => {
  try {
    if (!req.params.id) return res.status(204).json({ error: "No id sent." });
    const book = await Books.findByIdAndDelete(req.params.id);
    if (!book)
      return res.status(204).json({
        error: `Book with id ${req.params.id} not found in database.`,
      });
    res.status(200).json({ message: `Book with id:${req.params.id} deleted` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

const addBook = async (req, res) => {
  try {
    const {
      bookName,
      rentAmount,
      author,
      genre,
      language,
      rentPeriod,
      rentData,
      availabilityStatus,
      IsbnNo,
      year,
      description,
      bookId,
      barcode,
      refSubject,
      refNo,
    } = req.body;

    if (!bookName)
      return res
        .status(400)
        .json({ error: "Some inputs fields are left empty." });

    const book = await Books.create({
      bookName: bookName,
      rentAmount,
      author,
      genre: genre,
      language,
      rentPeriod,
      rentData,
      availabilityStatus,
      IsbnNo,
      year,
      description,
      bookId,
      barcode,
      refSubject,
      refNo,
      createdAt: Date.now(),
    });
    res.status(201).json(book);
    console.log(book);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

const editBook = async (req, res) => {
  try {
    if (!req.params.id) return res.status(400).json({ error: "No id sent" });
    const {
      bookName: bookName,
      rentAmount,
      author,
      genre: genre,
      language,
      rentPeriod,
      rentData,
      availabilityStatus,
      IsbnNo,
      year,
      description,
      bookId,
      barcode,
      refSubject,
      refNo,
    } = req.body;
    const book = await Books.findByIdAndUpdate(
      req.params.id,
      {
        bookName: bookName,
        rentAmount,
        author,
        genre: genre,
        language,
        rentPeriod,
        rentData,
        availabilityStatus,
        IsbnNo,
        year,
        description,
        bookId,
        barcode,
        refSubject,
        refNo,
        updatedAt: Date.now(),
      },
      { new: true }
    ).exec();
    if (!book)
      return res
        .status(204)
        .json({ error: `Book with id:${req.params.id} not found` });
    res.status(200).json(book);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "server error" });
  }
};

const addToRentlist = async (req, res) => {
  try {
    const userId = req.body.userId;
    const bookId = req.params.id;

    if (!bookId) {
      return res
        .status(400)
        .json({ error: "User Id doesn not contain any data." });
    }

    const book = await Books.findById(bookId);
    const user = await Students.findById(userId);

    if (!book.users.rentlist.includes(userId)) {
      book.users.rentlist.push(userId);
      await book.save();
    }

    if (!user.rentlist.includes(bookId)) {
      user.rentlist.push(bookId);
      await user.save();
    }
    res.status(200).json({ message: "user added to rentlist" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "server error." });
  }
};

const deleteFromRentlist = async (req, res) => {
  try {
    const userId = req.body.userId;
    const bookId = req.params.id;

    if (!bookId) {
      return res
        .status(400)
        .json({ error: "User Id doesn not contain any data." });
    }

    const book = await Books.findById(bookId);
    const user = await Students.findById(userId);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    book.users.rentlist = book.users.rentlist.filter(
      (id) => id.toString() !== userId
    );
    await book.save();

    user.rentlist = user.rentlist.filter((id) => id.toString() !== bookId);
    await user.save();

    res.status(200).json({ message: "id removed from rentlist" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
};

const userRentlist = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) return res.status(400).json({ error: "No user id sent" });
    const userData = await Students.findById(userId).exec();
    if (!userData) {
      return res
        .status(400)
        .json({ error: `No user with id ${userId} found.` });
    }
    const user = await Students.findById(userId);
    const rentlist = user.rentlist;
    const rentlistData = [];

    for (const itemId of rentlist) {
      const book = await Books.findById(itemId);
      if (book) {
        rentlistData.push(book);
      }
    }

    res.status(200).json(rentlistData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
};

const bookRentlist = async (req, res) => {
  try {
    const bookId = req.params.id;
    if (!bookId) return res.status(400).json({ error: "No book id sent" });
    const bookData = await Books.findById(bookId).exec();
    if (!bookData) {
      return res
        .status(400)
        .json({ error: `No book with id ${bookId} found.` });
    }
    const book = await Books.findById(bookId);
    const rentlist = book.users.rentlist;
    const rentlistData = [];

    for (const itemId of rentlist) {
      const user = await Students.findById(itemId);
      if (user) {
        rentlistData.push(user);
      }
    }

    res.status(200).json(rentlistData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
};

const bookIssueList = async (req, res) => {
  try {
    const bookId = req.params.id;
    if (!bookId) return res.status(400).json({ message: "No book id sent" });
    const { studentId } = req.body;
    if (!bookId) return res.status(400).json({ error: "No book id sent" });
    const bookData = await Books.findById(bookId).exec();
    if (!bookData) {
      return res
        .status(400)
        .json({ error: `No book with id ${bookId} found.` });
    }
    const book = await Books.findById(bookId);
    book.students.currentlyIssued = studentId;

    await book.save();

    // const rentlist = book.students.issueList;
    // const rentlistData = [];

    // for (const itemId of rentlist) {
    //   const user = await Students.findById(itemId);
    //   if (user) {
    //     rentlistData.push(user);
    //   }
    // }

    res.status(200).json(book);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
};

const bookUnIssueList = async (req, res) => {
  try {
    const bookId = req.params.id;
    if (!bookId) return res.status(400).json({ message: "No book id sent" });
    const { studentId } = req.body;
    if (!bookId) return res.status(400).json({ error: "No book id sent" });
    const bookData = await Books.findById(bookId).exec();
    if (!bookData) {
      return res
        .status(400)
        .json({ error: `No book with id ${bookId} found.` });
    }
    const book = await Books.findById(bookId);
    book.students.currentlyIssued = "";

    await book.save();

    // const rentlist = book.students.issueList;
    // const rentlistData = [];

    // for (const itemId of rentlist) {
    //   const user = await Students.findById(itemId);
    //   if (user) {
    //     rentlistData.push(user);
    //   }
    // }

    res.status(200).json(book);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
};

const getBookByName = async (req, res) => {
  try {
    if (!req.params.id)
      return res.status(400).json({ error: "No book name sent" });
    const book = await Books.find({
      $or: [
        { bookName: { $regex: new RegExp(req.params.id, "i") } },
        { genre: { $regex: new RegExp(req.params.id, "i") } },
      ],
    });
    if (!book)
      return res.status(204).json({
        error: `Book with name ${req.params.id} not found in database.`,
      });
    res.status(200).json(book);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

const getBookByGenre = async (req, res) => {
  try {
    if (!req.params.id)
      return res.status(400).json({ error: "No book name sent" });
    const book = await Books.find({
      genre: { $regex: new RegExp(`^${req.params.id}$`, "i") },
    });
    if (!book)
      return res.status(204).json({
        error: `Book with name ${req.params.id} not found in database.`,
      });
    res.status(200).json(book);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

////////////////////  Library report routes   //////////////////////////////

const getBookCount = async (req, res) => {
  try {
    const count = await Books.countDocuments();
    if (!count)
      return res.status(400).json({ message: "No data", success: false });
    res.status(200).json(count);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

const getIssuedCount = async (req, res) => {
  try {
    const issueCount = await Books.countDocuments({
      "students.currentlyIssued": { $exists: true, $ne: null },
    });
    if (!issueCount)
      return res.status(404).json({ message: "No data found", success: false });
    res.status(200).json(issueCount);
  } catch (error) {
    console.error(error);
  }
};

const genreCount = async (req, res) => {
  try {
    const count = await Books.aggregate([
      {
        $group: {
          _id: "$genre",
          count: { $sum: 1 },
        },
      },
    ]);
    // const formattedGenreCount = {};
    // count.forEach((genre) => {
    //   formattedGenreCount[genre._id] = genre.count;
    // });
    if (!count)
      return res.status(400).json({ message: "No data", success: false });
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

    const totalBooks = await Books.countDocuments().exec();
    const totalPages = Math.ceil(totalBooks / limit);

    const books = await Books.find().limit(limit).skip(startIndex).exec();

    if (!books || books.length === 0)
      return res.status(204).json("No books found");

    const pagination = {
      totalPages: totalPages,
    };
    if (endIndex < totalBooks) {
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

    res.status(200).json({ books, pagination });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getBook,
  getAllBooks,
  deleteBook,
  addBook,
  editBook,
  addToRentlist,
  deleteFromRentlist,
  userRentlist,
  bookRentlist,
  bookIssueList,
  getBookByName,
  bookUnIssueList,
  getBookByGenre,
  getBookCount,
  getIssuedCount,
  genreCount,
  getBooksByLimit,
};
