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
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import java.time.Duration;

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
    private Book book;

    @BeforeMethod
    public void setUp() {
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
        book = new Book("Effective Java", "Joshua Bloch", "Science", 2018);
    }

    @AfterMethod
    public void tearDown() {
        booksApiSteps.deleteBookByTitle(userContext, book.getTitle());
        driver.quit();
    }

    @Test
    public void createBook() {
        this.loginPageSteps.logIn(userContext);
        this.bookFormSteps.addBook(book);

        String[] rows = {"Effective Java Joshua Bloch Science 2018"};
        this.booksTableSteps.verifyRowsArePresent(rows);
    }
}
