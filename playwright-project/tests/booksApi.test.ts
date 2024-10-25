import { customTest as test } from '@fixtures/customTest.fixture';
import { BooksApiSteps } from '@steps/api/books.api.steps';
import { v4 as uuid_v4 } from 'uuid';
import { Book } from '@models/book';

test.describe('Create book by API', () => {
    const suffix: string = uuid_v4().slice(0, 8);
    const book: Book = {
        title: `book-${suffix}`,
        author: 'string',
        year: 2016,
        genre: 'string',
    };

    test.afterEach(async ({ userContext }) => {
        await BooksApiSteps.deleteBookByTitle(userContext, book.title);
    });

    test('Create book by API', async ({ userContext }) => {
        await BooksApiSteps.createBook(userContext, book);
        await BooksApiSteps.verifyBooksArePresent(userContext, [book]);
    });
});
