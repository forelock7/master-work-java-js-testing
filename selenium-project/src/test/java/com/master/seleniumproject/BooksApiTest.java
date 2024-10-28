package com.master.seleniumproject;

import com.master.seleniumproject.models.Book;
import com.master.seleniumproject.models.UserContext;
import com.master.seleniumproject.steps.api.books.BooksApiSteps;
import org.testng.ITestResult;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import java.util.UUID;

import static com.master.seleniumproject.config.EnvConfigs.PASSWORD;
import static com.master.seleniumproject.config.EnvConfigs.USERNAME;

public class BooksApiTest {
    private BooksApiSteps booksApiSteps;
    private UserContext userContext;
    private Book bookToCreate;
    private Book bookToUpdate;
    private Book newlyUpdatedBook;
    private Book bookToDelete;

    @BeforeMethod
    public void setUp(ITestResult result) {
        booksApiSteps = new BooksApiSteps();
        userContext = new UserContext(USERNAME, PASSWORD);
        if ("createBook".equals(result.getMethod().getMethodName())) {
            String bookTitle = "se-api-create-book-" + UUID.randomUUID().toString().substring(0, 8);
            bookToCreate = new Book(bookTitle, "George Heineman", "Study", 2021);
        }
        if ("updateBook".equals(result.getMethod().getMethodName())) {
            String bookTitle = "se-api-update-book-" + UUID.randomUUID().toString().substring(0, 8);
            bookToUpdate = new Book(bookTitle, "Markus Eisele, Natale Vinto", "Study", 2023);
            booksApiSteps.createBook(userContext, bookToUpdate);
        }
        if ("deleteBook".equals(result.getMethod().getMethodName())) {
            String bookTitle = "se-api-delete-book-" + UUID.randomUUID().toString().substring(0, 8);
            bookToDelete = new Book(bookTitle, "Boni Garcia", "Study", 2022);
            booksApiSteps.createBook(userContext, bookToDelete);
        }
    }

    @AfterMethod
    public void tearDown(ITestResult result) {
        if ("createBook".equals(result.getMethod().getMethodName())) {
            booksApiSteps.deleteBookByTitle(userContext, bookToCreate.getTitle());
        }
        if ("updateBook".equals(result.getMethod().getMethodName())) {
            booksApiSteps.deleteBookByTitle(userContext, bookToUpdate.getTitle());
            booksApiSteps.deleteBookByTitle(userContext, newlyUpdatedBook.getTitle());
        }
        if ("deleteBook".equals(result.getMethod().getMethodName())) {
            booksApiSteps.deleteBookByTitle(userContext, bookToDelete.getTitle());
        }
    }

    @Test
    public void createBook() {
        booksApiSteps.createBook(userContext, bookToCreate);
        booksApiSteps.verifyBookIsPresent(userContext, bookToCreate);
    }

    @Test
    public void updateBook() throws Exception {
        booksApiSteps.verifyBookIsPresent(userContext, bookToUpdate);
        newlyUpdatedBook = new Book(bookToUpdate.getTitle(), "UPDATED", bookToUpdate.getGenre(), bookToUpdate.getYear());
        booksApiSteps.updateBook(userContext, newlyUpdatedBook);
        booksApiSteps.verifyBookIsPresent(userContext, newlyUpdatedBook);
    }

    @Test
    public void deleteBook() {
        booksApiSteps.verifyBookIsPresent(userContext, bookToDelete);
        booksApiSteps.deleteBookByTitle(userContext, bookToDelete.getTitle());

        booksApiSteps.verifyBookIsAbsent(userContext, bookToDelete);
    }
}
