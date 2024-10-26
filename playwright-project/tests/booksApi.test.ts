import { customTest as test } from '@fixtures/customTest.fixture';
import { BooksApiSteps } from '@steps/api/books.api.steps';
import { v4 as uuid_v4 } from 'uuid';
import { Book } from '@models/book';

test.describe('Create book by API', () => {
    const bookTtitle: string = `update-book-${uuid_v4().slice(0, 8)}`;
    const book: Book = {
        title: bookTtitle,
        author: 'Mark Twain',
        year: 1945,
        genre: 'Novel',
    };

    test.afterEach(async ({ userContext }) => {
        await BooksApiSteps.deleteBookByTitle(userContext, book.title);
    });

    test('Create book by API', async ({ userContext }) => {
        await BooksApiSteps.createBook(userContext, book);
        await BooksApiSteps.verifyBooksArePresent(userContext, [book]);
    });
});

test.describe('Update book by API', () => {
    const bookTtitle: string = `update-book-${uuid_v4().slice(0, 8)}`;
    const book: Book = {
        title: bookTtitle,
        author: 'Stephen King',
        year: 1989,
        genre: 'Fantasy',
    };

    test.beforeEach(async ({ userContext }) => {
        await BooksApiSteps.createBook(userContext, book);
    });

    test.afterEach(async ({ userContext }) => {
        await BooksApiSteps.deleteBookByTitle(userContext, book.title);
    });

    test('Update book by API', async ({ userContext }) => {
        await BooksApiSteps.verifyBooksArePresent(userContext, [book]);
        const updatedBook: Book = {
            title: bookTtitle,
            author: 'Stephen King',
            year: 2016,
            genre: 'Horror',
        };
        await BooksApiSteps.updateBook(userContext, updatedBook);
        await BooksApiSteps.verifyBooksArePresent(userContext, [updatedBook]);
    });
});

test.describe('Delete book by API', () => {
    const bookTtitle: string = `delete-book-${uuid_v4().slice(0, 8)}`;
    const book: Book = {
        title: bookTtitle,
        author: 'Nicholas Sparks',
        year: 2003,
        genre: 'Romantic drama',
    };

    test.beforeEach(async ({ userContext }) => {
        await BooksApiSteps.createBook(userContext, book);
    });

    test('Delete book by API', async ({ userContext }) => {
        await BooksApiSteps.verifyBooksArePresent(userContext, [book]);
        await BooksApiSteps.deleteBookByTitle(userContext, book.title);
        await BooksApiSteps.verifyBooksAreAbsent(userContext, [book]);
    });
});
