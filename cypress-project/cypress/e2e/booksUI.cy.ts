import LoginPageSteps from '../steps/ui/login/loginPage.steps';
import { UserContext } from '../config/userContext';
import { Book } from '../models/book';
import BookFormSteps from '../steps/ui/books/bookForm.steps';
import BooksTableSteps from '../steps/ui/books/booksTable.steps';

describe('template spec', () => {
    const userContext = new UserContext();
    const book: Book = {
        title: 'C++ Programming Language',
        author: 'Bjarne Stroustrup',
        year: 2013,
        genre: 'Education',
    };
    it('passes', () => {
        LoginPageSteps.login(userContext);
        BookFormSteps.addBook(book);
        BooksTableSteps.verifyRowsArePresent([
            `${book.title} ${book.author} ${book.genre} ${book.year}`,
        ]);
    });
});
