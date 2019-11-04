const express = require('express');
const mongoose = require('mongoose');
const Book = mongoose.model('Book');

const router = express.Router();

router.get('/', (req, res) => {
    res.render("book/addOrEdit", {
        viewTitle: "Add Book"
    });
});

// INSERT BOOK ROUTE
router.post('/', async (req, res) => {
    console.log(req.body);
    if (req.body._id == '') {
        await addBook(req, res);
    } else {
        await updateBook(req, res);
    }

});

// ADD BOOK FUNCTION
function addBook(req, res) {
    const book = new Book();
    // console.log(req.body);

    book.title = req.body.title;
    book.author = req.body.author;
    book.genre = req.body.genre;
    book.rating = req.body.rating;

    try {
        const savedBook = book.save();
        res.redirect('book/list');
    } catch (err) {
        // console.log(err.name);
        if (err.name == "ValidationError") {
            handleValidationError(err, req.body);
            res.render("book/addOrEdit", {
                viewTitle: "Insert Book",
                book: req.body
            });
        }
        console.log({ msg: err });
    }
}

// UPDATE BOOK FUNCTION
function updateBook(req, res) {

    Book.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) {
            res.redirect('book/list')
        } else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("book/addOrEdit", {
                    viewTitle: 'Update Book',
                    book: req.body
                });
            } else {
                console.log(`Error updating book: ${err}`);
            }
        }
    })
}

// LIST BOOKS
router.get('/list', async (req, res) => {
    // res.json('from list');
    try {
        const books = await Book.find();
        // console.log(books);
        res.render("book/list", {
            list: books
        });
    } catch (err) {
        console.log(`Error retrieving books. Error: ${err}`);
    }
});

// DELETE BOOK
router.get('/delete/:id', (req, res) => {
    Book.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/book/list');
        } else {
            console.log(`Error removing book: ${err}`);
        }
    })
});

// HANDLE VALIDATION ERRORS
function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'title':
                body['titleError'] = err.errors[field].message;
                break;
            case 'author':
                body['authorError'] = err.errors[field].message;
                break;
            case 'genre':
                body['genreError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
};

//FIND CLICKED ON BOOK FOR UPDATE
router.get('/:id', async (req, res) => {
    const book = await Book.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("book/addOrEdit", {
                viewTitle: "Update Book",
                book: doc
            });
        }
    });
});


module.exports = router;