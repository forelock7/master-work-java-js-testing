import {sisenseTest as test} from '@fixtures/sisenseTest.fixture';
import {BooksApiSteps} from '@steps/api/books.api.steps';

test.describe('Get books', () => {
    test('Get books', async ({ userContext }) => {
        await BooksApiSteps.verifyBooksArePresentByTittle(userContext, [
            'Дюна',
            'Пригоди Тома Сойєра',
        ]);
    });
});
