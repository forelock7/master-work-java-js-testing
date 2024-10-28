import { UserContext } from '../config/userContext';
import { Book } from '../models/book';
import BooksApiSteps from '../steps/api/books/books.api.steps';
import { v4 as uuid_v4 } from 'uuid';

describe('Create book via API', () => {
    const userContext = new UserContext();
    const bookTitle: string = `cy-api-create-book-${uuid_v4().slice(0, 8)}`;
    const book: Book = {
        title: bookTitle,
        author: 'Christopher Preschern',
        year: 2022,
        genre: 'Education',
    };
    afterEach(() => {
        BooksApiSteps.deleteBookByTitle(userContext, book.title);
    });
    it('create', () => {
        BooksApiSteps.createBook(userContext, book);
        BooksApiSteps.verifyBooksArePresent(userContext, [book]);
    });
});

describe('Update book via API', () => {
    const userContext = new UserContext();
    const bookTitle: string = `cy-api-update-book-${uuid_v4().slice(0, 8)}`;
    const book: Book = {
        title: bookTitle,
        author: 'Martin Kleppmann',
        year: 2017,
        genre: 'Education',
    };
    beforeEach(() => {
        BooksApiSteps.createBook(userContext, book);
    });
    afterEach(() => {
        BooksApiSteps.deleteBookByTitle(userContext, book.title);
    });
    it('update', () => {
        BooksApiSteps.verifyBooksArePresent(userContext, [book]);
        const updatedBook: Book = {
            title: bookTitle,
            author: 'UPDATEMartin Kleppmann',
            year: 2000,
            genre: 'Education',
        };
        BooksApiSteps.updateBook(userContext, updatedBook);
        BooksApiSteps.verifyBooksArePresent(userContext, [updatedBook]);
    });
});

describe('Delete book via API', () => {
    const userContext = new UserContext();
    const bookTitle: string = `cy-api-delete-book-${uuid_v4().slice(0, 8)}`;
    const book: Book = {
        title: bookTitle,
        author: 'Luciano Ramalho',
        year: 2022,
        genre: 'Education',
    };
    beforeEach(() => {
        BooksApiSteps.createBook(userContext, book);
    });
    it('delete', () => {
        BooksApiSteps.verifyBooksArePresent(userContext, [book]);
        BooksApiSteps.deleteBookByTitle(userContext, book.title);
        BooksApiSteps.verifyBooksAreAbsent(userContext, [book]);
    });
});
