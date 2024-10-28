import {customTest as test} from '@fixtures/customTest.fixture';
import {BooksApiSteps} from '@steps/api/books.api.steps';
import {v4 as uuid_v4} from 'uuid';
import {Book} from '@models/book';

test.describe('Create book via API', () => {
    const bookTitle: string = `pw-api-create-book-${uuid_v4().slice(0, 8)}`;
    const book: Book = {
        title: bookTitle,
        author: 'Mark Twain',
        year: 1945,
        genre: 'Novel',
    };

    test.afterEach(async ({ userContext }) => {
        await BooksApiSteps.deleteBookByTitle(userContext, book.title);
    });

    test('Create book via API', async ({ userContext }) => {
        await BooksApiSteps.createBook(userContext, book);
        await BooksApiSteps.verifyBooksArePresent(userContext, [book]);
    });
});

test.describe('Update book via API', () => {
    const bookTitle: string = `pw-api-update-book-${uuid_v4().slice(0, 8)}`;
    const book: Book = {
        title: bookTitle,
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

    test('Update book via API', async ({ userContext }) => {
        await BooksApiSteps.verifyBooksArePresent(userContext, [book]);
        const updatedBook: Book = {
            ...book,
            author: 'UPDATED',
        };
        await BooksApiSteps.updateBook(userContext, updatedBook);
        await BooksApiSteps.verifyBooksArePresent(userContext, [updatedBook]);
    });
});

test.describe('Delete book via API', () => {
    const bookTitle: string = `pw-api-delete-book-${uuid_v4().slice(0, 8)}`;
    const book: Book = {
        title: bookTitle,
        author: 'Nicholas Sparks',
        year: 2003,
        genre: 'Romantic drama',
    };

    test.beforeEach(async ({ userContext }) => {
        await BooksApiSteps.createBook(userContext, book);
    });

    test('Delete book via API', async ({ userContext }) => {
        await BooksApiSteps.verifyBooksArePresent(userContext, [book]);
        await BooksApiSteps.deleteBookByTitle(userContext, book.title);
        await BooksApiSteps.verifyBooksAreAbsent(userContext, [book]);
    });
});
