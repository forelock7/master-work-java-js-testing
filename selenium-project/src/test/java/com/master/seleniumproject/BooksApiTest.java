package com.master.seleniumproject;

import com.master.seleniumproject.models.Book;
import com.master.seleniumproject.models.UserContext;
import com.master.seleniumproject.steps.api.books.BooksApiSteps;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import static com.master.seleniumproject.config.EnvConfigs.PASSWORD;
import static com.master.seleniumproject.config.EnvConfigs.USERNAME;

public class BooksApiTest {
    private BooksApiSteps booksApiSteps;
    private UserContext userContext;
    private Book book;

    @BeforeMethod
    public void setUp() {
        booksApiSteps = new BooksApiSteps();
        userContext = new UserContext(USERNAME, PASSWORD);
        book = new Book("Learning Algorithms: A Programmer's Guide to Writing Better Code.", "George Heineman", "Study", 2021);
    }

    @AfterMethod
    public void tearDown() {
        booksApiSteps.deleteBookByTitle(userContext, book.getTitle());
    }

    @Test
    public void createBook() {
        booksApiSteps.createBook(userContext, book);
        booksApiSteps.verifyBookIsPresent(userContext, book);
    }
}
