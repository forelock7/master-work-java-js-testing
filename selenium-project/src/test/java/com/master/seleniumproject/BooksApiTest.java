package com.master.seleniumproject;

import com.master.seleniumproject.models.Book;
import com.master.seleniumproject.models.UserContext;
import com.master.seleniumproject.steps.api.books.BooksApiSteps;
import org.testng.ITestResult;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import static com.master.seleniumproject.config.EnvConfigs.PASSWORD;
import static com.master.seleniumproject.config.EnvConfigs.USERNAME;

public class BooksApiTest {
    private BooksApiSteps booksApiSteps;
    private UserContext userContext;
    private Book createBook;
    private Book updateBook;
    private Book newlyUpdatedBook;

    @BeforeMethod
    public void setUp(ITestResult result) {
        booksApiSteps = new BooksApiSteps();
        userContext = new UserContext(USERNAME, PASSWORD);
        if ("createBook".equals(result.getMethod().getMethodName())) {
            createBook = new Book("Learning Algorithms: A Programmer's Guide to Writing Better Code.", "George Heineman", "Study", 2021);
        }
        if ("updateBook".equals(result.getMethod().getMethodName())) {
            updateBook = new Book("Modernizing Enterprise Java", "Markus Eisele, Natale Vinto", "Study", 2023);
            booksApiSteps.createBook(userContext, updateBook);
        }
    }

    @AfterMethod
    public void tearDown(ITestResult result) {
        if ("createBook".equals(result.getMethod().getMethodName())) {
            booksApiSteps.deleteBookByTitle(userContext, createBook.getTitle());
        }
        if ("updateBook".equals(result.getMethod().getMethodName())) {
            booksApiSteps.deleteBookByTitle(userContext, updateBook.getTitle());
        }
    }

    @Test
    public void createBook() {
        booksApiSteps.createBook(userContext, createBook);
        booksApiSteps.verifyBookIsPresent(userContext, createBook);
    }

    @Test
    public void updateBook() throws Exception {
        booksApiSteps.verifyBookIsPresent(userContext, updateBook);
        newlyUpdatedBook = new Book("Modernizing Enterprise Java", "UPDATEDMarkus Eisele, Natale Vinto", "Study", 2023);
        booksApiSteps.updateBook(userContext, newlyUpdatedBook);
        booksApiSteps.verifyBookIsPresent(userContext, newlyUpdatedBook);
    }
}
