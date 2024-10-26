package com.master.seleniumproject;

import com.master.seleniumproject.models.Book;
import com.master.seleniumproject.models.UserContext;
import com.master.seleniumproject.pages.books.BookForm;
import com.master.seleniumproject.steps.ui.books.BookFormSteps;
import com.master.seleniumproject.steps.ui.books.BooksTableSteps;
import com.master.seleniumproject.steps.ui.login.LoginPageSteps;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import java.net.MalformedURLException;
import java.time.Duration;

import static org.testng.Assert.assertEquals;
import static org.testng.Assert.assertTrue;

public class BooksUiTest {

    private WebDriver driver;
    private LoginPageSteps loginPageSteps;
    private BookFormSteps bookFormSteps;
    private BooksTableSteps booksTableSteps;
    private UserContext userContext;
    private Book book;

    @BeforeMethod
    public void setUp() throws MalformedURLException {
        String host = System.getenv("HOST");
        String username = System.getenv("USERNAME");
        String password = System.getenv("PASSWORD");
        String baseUrl = "http://" + host + ":8080";
        boolean isHeadless = Boolean.parseBoolean(System.getenv("IS_HEADLESS"));
        ChromeOptions options = new ChromeOptions();
        // Fix the issue https://github.com/SeleniumHQ/selenium/issues/11750
        options.addArguments("--remote-allow-origins=*");
        if (isHeadless) {
            options.addArguments("--headless=new");
            options.addArguments("--disable-gpu");
        };
        driver = new ChromeDriver(options);
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
        driver.get(baseUrl);

        loginPageSteps = new LoginPageSteps(driver);
        bookFormSteps = new BookFormSteps(driver);
        booksTableSteps = new BooksTableSteps(driver);
        userContext = new UserContext(username, password);
        book = new Book("Effective Java", "Joshua Bloch", "Scince", 2018);

    }

    @AfterMethod
    public void tearDown() {
        driver.quit();
    }

    @Test
    public void createBook() {
        this.loginPageSteps.logIn(userContext);
        this.bookFormSteps.addBook(book);

        String[] rows = {"Effective Java Joshua Bloch Scince 2018"};
        this.booksTableSteps.verifyRowsArePresent(rows);
    }

}
