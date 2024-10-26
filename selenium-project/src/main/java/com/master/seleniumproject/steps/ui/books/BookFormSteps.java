package com.master.seleniumproject.steps.ui.books;

import com.master.seleniumproject.models.Book;
import com.master.seleniumproject.models.UserContext;
import com.master.seleniumproject.pages.books.BookForm;
import com.master.seleniumproject.pages.books.BooksPage;
import com.master.seleniumproject.pages.login.LoginPage;
import org.assertj.core.api.Assertions;
import org.openqa.selenium.WebDriver;

public class BookFormSteps {
    private final BookForm bookForm;

    public BookFormSteps(WebDriver driver) {
        this.bookForm = new BookForm(driver);
    }

    public void addBook(Book book) {
        this.fillTittleInput(book.getTittle());
        this.fillAuthorInput(book.getAuthor());
        this.fillGenreInput(book.getGenre());
        this.fillYearInput(book.getYear());

        this.clickAddUpdateButton();
    }

    public void fillTittleInput(String tittle) {
        this.bookForm.fillTittleInput( tittle);
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
