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
    it('Add book via API', () => {
        BooksApiSteps.createBook(userContext, book);
        BooksApiSteps.verifyBooksArePresent(userContext, [book]);
    });
});
