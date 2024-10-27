import {customTest as test} from '@fixtures/customTest.fixture';
import {BooksApiSteps} from '@steps/api/books.api.steps';
import {v4 as uuid_v4} from 'uuid';
import {Book} from '@models/book';

test.describe('Create book by API', () => {
    const bookTitle: string = `add-book-ui-${uuid_v4().slice(0, 8)}`;
    const book: Book = {
        title: bookTitle,
        author: 'Tom Bloom',
        year: 1975,
        genre: 'Comedy',
    };

    test.afterEach(async ({ userContext }) => {
        await BooksApiSteps.deleteBookByTitle(userContext, book.title);
    });

    test('Create book by API', async ({
        userContext,
        loginPageSteps,
        bookFormSteps,
        booksTableSteps,
    }) => {
        await loginPageSteps.logIn(userContext);
        await bookFormSteps.addBook(book);
        await booksTableSteps.verifyRowsArePresent([
            `${book.title} ${book.author} ${book.genre} ${book.year}`,
        ]);
    });
});
