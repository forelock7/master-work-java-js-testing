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
