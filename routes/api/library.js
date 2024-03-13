const express = require('express');
const router = express.Router();
const booksController = require('../../controllers/BooksController');

router.route('/books/issuelist/search/:id').get(booksController.getBookByName);
router.route('/books/issuelist/searchGenre/:id').get(booksController.getBookByGenre);
router.route('/books/issuelist/:id').post(booksController.bookIssueList).put(booksController.bookUnIssueList);

router.route('/books/pagination/filter').put(booksController.getBooksByLimitFilter);
router.route('/books/pagination').get(booksController.getBooksByLimit);

router.route('/books/filter').put(booksController.filterBooks);
router.route('/books').get(booksController.getAllBooks).post(booksController.addBook);

router.route('/books/:id').get(booksController.getBook).delete(booksController.deleteBook).put(booksController.editBook);

router.route('/reports/bookcount/filter').get(booksController.getBookCount);
router.route('/reports/bookcount').get(booksController.getBookCount);

router.route('/reports/issuecount/filter').get(booksController.getIssuedCount);
router.route('/reports/issuecount').get(booksController.getIssuedCount);

router.route('/reports/genrecount/filter').get(booksController.genreCount);
router.route('/reports/genrecount').get(booksController.genreCount);

module.exports = router;
