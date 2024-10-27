import { Book } from '../../../models/book';
import BookForm from '../../../pages/books/BookForm';

class BookFormSteps {
    /**
     * Fills and submit book form during adding new book
     * @param book - book DTO object
     */
    addBook(book: Book) {
        this.fillTitleInput(book.title);
        this.fillAuthorInput(book.author);
        this.fillGenreInput(book.genre);
        this.fillYearInput(book.year);

        this.clickAddUpdateButton();
    }

    /**
     * Fills and submit book form during updating existing book
     * @param book - book DTO object
     */
    updateBook(book: Book) {
        this.addBook(book);
    }

    /**
     * Fills 'Title' input field
     * @param title
     */
    fillTitleInput(title: string) {
        BookForm.fillTitle(title);
    }

    fillAuthorInput(author: string) {
        BookForm.fillAuthor(author);
    }

    /**
     * Fills 'Genre' input field
     * @param genre
     */
    fillGenreInput(genre: string) {
        BookForm.fillGenre(genre);
    }

    /**
     * Fills 'Year' input field
     * @param year
     */
    fillYearInput(year: number) {
        BookForm.fillYear(String(year));
    }

    /**
     * Clicks 'Add/Update' button
     */
    clickAddUpdateButton() {
        BookForm.clickAddUpdateButton();
    }
}
export default new BookFormSteps();
