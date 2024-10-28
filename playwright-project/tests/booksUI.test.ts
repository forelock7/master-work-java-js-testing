import { customTest as test } from '@fixtures/customTest.fixture';
import { BooksApiSteps } from '@steps/api/books.api.steps';
import { v4 as uuid_v4 } from 'uuid';
import { Book } from '@models/book';

test.describe('Create book via UI', () => {
    const bookTitle: string = `pw-ui-create-book-${uuid_v4().slice(0, 8)}`;
    const book: Book = {
        title: bookTitle,
        author: 'Tom Bloom',
        year: 1975,
        genre: 'Comedy',
    };

    test.afterEach(async ({ userContext }) => {
        await BooksApiSteps.deleteBookByTitle(userContext, book.title);
    });

    test('create', async ({ userContext, loginPageSteps, bookFormSteps, booksTableSteps }) => {
        await loginPageSteps.logIn(userContext);
        await bookFormSteps.addBook(book);
        await booksTableSteps.verifyRowsArePresent([
            `${book.title} ${book.author} ${book.genre} ${book.year}`,
        ]);
    });
});

test.describe('Delete book via UI', () => {
    const bookTitle: string = `pw-ui-delete-book-${uuid_v4().slice(0, 8)}`;
    const book: Book = {
        title: bookTitle,
        author: 'Jerry Grey',
        year: 1980,
        genre: 'Novels',
    };

    test.beforeEach(async ({ userContext }) => {
        await BooksApiSteps.createBook(userContext, book);
    });

    test.afterEach(async ({ userContext }) => {
        await BooksApiSteps.deleteBookByTitle(userContext, book.title);
    });

    test('delete', async ({ userContext, loginPageSteps, bookFormSteps, booksTableSteps }) => {
        await loginPageSteps.logIn(userContext);
        await booksTableSteps.verifyRowsArePresent([
            `${book.title} ${book.author} ${book.genre} ${book.year}`,
        ]);
        const b = await BooksApiSteps.getBookByTitle(userContext, book.title);
        await booksTableSteps.deleteBookById(b?.id!);
        await booksTableSteps.verifyRowsAreAbsent([
            `${book.title} ${book.author} ${book.genre} ${book.year}`,
        ]);
    });
});
