package com.master.seleniumproject;

import com.master.seleniumproject.models.Book;
import com.master.seleniumproject.models.UserContext;
import com.master.seleniumproject.steps.api.books.BooksApiSteps;
import com.master.seleniumproject.steps.ui.books.BookFormSteps;
import com.master.seleniumproject.steps.ui.books.BooksTableSteps;
import com.master.seleniumproject.steps.ui.login.LoginPageSteps;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.testng.ITestResult;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import java.time.Duration;
import java.util.List;
import java.util.UUID;

import static com.master.seleniumproject.config.EnvConfigs.BASE_URL;
import static com.master.seleniumproject.config.EnvConfigs.IS_HEADLESS;
import static com.master.seleniumproject.config.EnvConfigs.PASSWORD;
import static com.master.seleniumproject.config.EnvConfigs.USERNAME;

public class BooksUiTest {

    private WebDriver driver;
    private LoginPageSteps loginPageSteps;
    private BookFormSteps bookFormSteps;
    private BooksTableSteps booksTableSteps;
    private BooksApiSteps booksApiSteps;
    private UserContext userContext;
    private Book bookToCreate;
    private Book bookToUpdate;
    private Book newlyUpdatedBook;
    private Book bookToDelete;

    @BeforeMethod
    public void setUp(ITestResult result) {
        ChromeOptions options = new ChromeOptions();
        // Fix the issue https://github.com/SeleniumHQ/selenium/issues/11750
        options.addArguments("--remote-allow-origins=*");
        if (IS_HEADLESS) {
            options.addArguments("--headless=new");
            options.addArguments("--disable-gpu");
        };
        driver = new ChromeDriver(options);
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
        driver.get(BASE_URL);

        loginPageSteps = new LoginPageSteps(driver);
        bookFormSteps = new BookFormSteps(driver);
        booksTableSteps = new BooksTableSteps(driver);
        booksApiSteps = new BooksApiSteps();
        userContext = new UserContext(USERNAME, PASSWORD);

        if ("createBookUI".equals(result.getMethod().getMethodName())) {
            String bookTitle = "se-ui-create-book-" + UUID.randomUUID().toString().substring(0, 8);
            bookToCreate = new Book(bookTitle, "Joshua Bloch", "Science", 2018);
        }
        if ("updateBookUI".equals(result.getMethod().getMethodName())) {
            String bookTitle = "se-ui-update-book-" + UUID.randomUUID().toString().substring(0, 8);
            bookToUpdate = new Book(bookTitle, "Jane Doe", "Novels", 2011);
            booksApiSteps.createBook(userContext, bookToUpdate);
        }
        if ("deleteBookUI".equals(result.getMethod().getMethodName())) {
            String bookTitle = "se-ui-delete-book-" + UUID.randomUUID().toString().substring(0, 8);
            bookToDelete = new Book(bookTitle, "Jack London", "Novels", 2008);
            booksApiSteps.createBook(userContext, bookToDelete);
        }
        this.loginPageSteps.logIn(userContext);
    }

    @AfterMethod
    public void tearDown(ITestResult result) {
        if ("createBookUI".equals(result.getMethod().getMethodName())) {
            booksApiSteps.deleteBookByTitle(userContext, bookToCreate.getTitle());
        }
        if ("updateBookUI".equals(result.getMethod().getMethodName())) {
            booksApiSteps.deleteBookByTitle(userContext, bookToUpdate.getTitle());
            if (newlyUpdatedBook != null) booksApiSteps.deleteBookByTitle(userContext, newlyUpdatedBook.getTitle());
        }
        if ("deleteBookUI".equals(result.getMethod().getMethodName())) {
            booksApiSteps.deleteBookByTitle(userContext, bookToDelete.getTitle());
        }
        driver.quit();
    }

    @Test
    public void createBookUI() {
        this.bookFormSteps.addBook(bookToCreate);

        List<String> rows = List.of(bookToCreate.getTitle() + " " + bookToCreate.getAuthor() + " " + bookToCreate.getGenre() + " " + bookToCreate.getYear());
        this.booksTableSteps.verifyRowsArePresent(rows);
    }

    @Test
    public void updateBookUI() {
        List<String> rows = List.of(bookToUpdate.getTitle() + " " + bookToUpdate.getAuthor() + " " + bookToUpdate.getGenre() + " " + bookToUpdate.getYear());
        this.booksTableSteps.verifyRowsArePresent(rows);

        newlyUpdatedBook = new Book(bookToUpdate.getTitle(), "UPDATED", bookToUpdate.getGenre(), bookToUpdate.getYear());

        Book book = this.booksApiSteps.getBookByTitle(userContext, newlyUpdatedBook.getTitle());
        this.booksTableSteps.deleteBookById(book.getId());
        this.booksTableSteps.verifyRowsAreAbsent(rows);
    }

    @Test
    public void deleteBookUI() {
        List<String> rows = List.of(bookToDelete.getTitle() + " " + bookToDelete.getAuthor() + " " + bookToDelete.getGenre() + " " + bookToDelete.getYear());
        this.booksTableSteps.verifyRowsArePresent(rows);
        Book book = this.booksApiSteps.getBookByTitle(userContext, bookToDelete.getTitle());
        this.booksTableSteps.deleteBookById(book.getId());
        this.booksTableSteps.verifyRowsAreAbsent(rows);
    }
}
