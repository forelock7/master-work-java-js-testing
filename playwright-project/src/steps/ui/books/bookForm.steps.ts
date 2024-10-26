import {Page, test} from '@playwright/test';
import {BrowserSteps} from '@steps/ui/browser.steps';
import {Book} from '@models/book';
import {BookForm} from '@pages/books/bookForm';

export class BookFormSteps extends BrowserSteps {
    constructor(
        page: Page,
        private bookForm: BookForm = new BookForm(page),
    ) {
        super(page);
    }

    /**
     * Fills and submit book form during adding new book
     * @param book - book DTO object
     */
    addBook = async (book: Book): Promise<void> => {
        await test.step(`Add/Update book with '${book.toString()}' in 'Book' form on 'Books' page`, async () => {
            await this.fillTitleInput(book.title);
            await this.fillAuthorInput(book.author);
            await this.fillGenreInput(book.genre);
            await this.fillYearInput(book.year);

            await this.clickAddUpdateButton();
        });
    };

    /**
     * Fills and submit book form during updating existing book
     * @param book - book DTO object
     */
    updateBook = async (book: Book): Promise<void> => {
        await this.addBook(book);
    };

    /**
     * Fills 'Title' input field
     * @param title
     */
    fillTitleInput = async (title: string): Promise<void> => {
        await test.step(`Fill 'Title' input by '${title}' in 'Book' form on 'Books' page`, async () => {
            await this.bookForm.fillTitle(title);
        });
    };

    /**
     * Fills 'Author' input field
     * @param author
     */
    fillAuthorInput = async (author: string): Promise<void> => {
        await test.step(`Fill 'Author' input by '${author}' in 'Book' form on 'Books' page`, async () => {
            await this.bookForm.fillAuthor(author);
        });
    };

    /**
     * Fills 'Genre' input field
     * @param genre
     */
    fillGenreInput = async (genre: string): Promise<void> => {
        await test.step(`Fill 'Genre' input by '${genre}' in 'Book' form on 'Books' page`, async () => {
            await this.bookForm.fillGenre(genre);
        });
    };

    /**
     * Fills 'Year' input field
     * @param year
     */
    fillYearInput = async (year: number): Promise<void> => {
        await test.step(`Fill 'Year' input by '${year}' in 'Book' form on 'Books' page`, async () => {
            await this.bookForm.fillYear(String(year));
        });
    };

    /**
     * Clicks 'Add/Update' button
     */
    clickAddUpdateButton = async (): Promise<void> => {
        await test.step(`Click 'Add/Update' button in 'Book' form on 'Books' page`, async () => {
            await this.bookForm.clickAddUpdateButton();
        });
    };
}
