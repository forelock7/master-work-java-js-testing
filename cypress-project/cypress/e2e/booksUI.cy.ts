import LoginPageSteps from '../steps/ui/login/loginPage.steps';
import { UserContext } from '../config/userContext';
import { Book } from '../models/book';
import BookFormSteps from '../steps/ui/books/bookForm.steps';
import BooksTableSteps from '../steps/ui/books/booksTable.steps';
import BooksApiSteps from '../steps/api/books/books.api.steps';
import { v4 as uuid_v4 } from 'uuid';

describe('Create book via UI', () => {
    const userContext = new UserContext();
    const bookTitle: string = `cy-ui-create-book-${uuid_v4().slice(0, 8)}`;
    const book: Book = {
        title: bookTitle,
        author: 'Bjarne Stroustrup',
        year: 2013,
        genre: 'Education',
    };
    afterEach(() => {
        BooksApiSteps.deleteBookByTitle(userContext, book.title);
    });
    it('create', () => {
        LoginPageSteps.login(userContext);
        BookFormSteps.addBook(book);
        BooksTableSteps.verifyRowsArePresent([
            `${book.title} ${book.author} ${book.genre} ${book.year}`,
        ]);
    });
});

describe('Update book via UI', () => {
    const userContext = new UserContext();
    const bookTitle: string = `cy-ui-update-book-${uuid_v4().slice(0, 8)}`;
    const book: Book = {
        title: bookTitle,
        author: 'Mark June',
        year: 1975,
        genre: 'Roman',
    };
    let updatedBook: Book;
    beforeEach(() => {
        BooksApiSteps.createBook(userContext, book);
    });
    afterEach(() => {
        BooksApiSteps.deleteBookByTitle(userContext, book.title);
        if (updatedBook) BooksApiSteps.deleteBookByTitle(userContext, updatedBook.title);
    });
    it('update', () => {
        LoginPageSteps.login(userContext);
        BooksTableSteps.verifyRowsArePresent([
            `${book.title} ${book.author} ${book.genre} ${book.year}`,
        ]);
        updatedBook = {
            ...book,
            author: 'UPDATED',
        };
        BookFormSteps.updateBook(updatedBook);
        BooksTableSteps.verifyRowsArePresent([
            `${updatedBook.title} ${updatedBook.author} ${updatedBook.genre} ${updatedBook.year}`,
        ]);
    });
});

describe('Delete book via UI', () => {
    const userContext = new UserContext();
    const bookTitle: string = `cy-ui-delete-book-${uuid_v4().slice(0, 8)}`;
    const book: Book = {
        title: bookTitle,
        author: 'Mario Stromeo',
        year: 1999,
        genre: 'Roman',
    };
    beforeEach(() => {
        BooksApiSteps.createBook(userContext, book);
    });
    afterEach(() => {
        BooksApiSteps.deleteBookByTitle(userContext, book.title);
    });
    it('delete', () => {
        LoginPageSteps.login(userContext);
        BooksTableSteps.verifyRowsArePresent([
            `${book.title} ${book.author} ${book.genre} ${book.year}`,
        ]);
        BooksApiSteps.getBookByTitle(userContext, book.title).then((b) => {
            BooksTableSteps.deleteBookById(b.id);
        });
        BooksTableSteps.verifyRowsAreAbsent([
            `${book.title} ${book.author} ${book.genre} ${book.year}`,
        ]);
    });
});
