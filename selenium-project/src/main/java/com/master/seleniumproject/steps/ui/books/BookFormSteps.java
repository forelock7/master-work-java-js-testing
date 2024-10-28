package com.master.seleniumproject.steps.ui.books;

import com.master.seleniumproject.models.Book;
import com.master.seleniumproject.pages.books.BookForm;
import org.openqa.selenium.WebDriver;

public class BookFormSteps {
    private final BookForm bookForm;

    public BookFormSteps(WebDriver driver) {
        this.bookForm = new BookForm(driver);
    }

    public void addBook(Book book) {
        this.fillTitleInput(book.getTitle());
        this.fillAuthorInput(book.getAuthor());
        this.fillGenreInput(book.getGenre());
        this.fillYearInput(book.getYear());

        this.clickAddUpdateButton();
    }

    public void updateBook(Book book) {
        this.addBook(book);
    }

    public void fillTitleInput(String title) {
        this.bookForm.fillTitleInput( title);
    }

    public void fillAuthorInput(String author) {
        this.bookForm.fillAuthorInput( author);
    }

    public void fillGenreInput(String genre) {
        this.bookForm.fillGenreInput( genre);
    }

    public void fillYearInput(int year) {
        this.bookForm.fillYearInput(String.valueOf(year));
    }

    public void clickAddUpdateButton() {
        this.bookForm.clickAddUpdateButton();
    }
}
