import { UserContext } from '../config/userContext';
import { Book } from '../models/book';
import BooksApiSteps from '../steps/api/books/books.api.steps';

describe('Add book via API', () => {
    const userContext = new UserContext();
    const book: Book = {
        title: 'Fluent C: Principles, Practices, and Patterns',
        author: 'Christopher Preschern',
        year: 2022,
        genre: 'Education',
    };
    afterEach(() => {
        BooksApiSteps.deleteBookByTitle(userContext, book.title);
    });
    it('passes', () => {
        BooksApiSteps.createBook(userContext, book);
        BooksApiSteps.verifyBooksArePresent(userContext, [book]);
    });
});

describe('Update book via API', () => {
    const userContext = new UserContext();
    const book: Book = {
        title: 'Designing Data-Intensive Applications',
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
    it('passes', () => {
        BooksApiSteps.verifyBooksArePresent(userContext, [book]);
        const updatedBook: Book = {
            title: 'Designing Data-Intensive Applications',
            author: 'Martin Kleppmann',
            year: 2017,
            genre: 'Education',
        };
        BooksApiSteps.updateBook(userContext, updatedBook);
        BooksApiSteps.verifyBooksArePresent(userContext, [updatedBook]);
    });
});
