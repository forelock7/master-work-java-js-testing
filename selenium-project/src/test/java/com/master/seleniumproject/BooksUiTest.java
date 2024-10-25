package com.master.seleniumproject;

import com.master.seleniumproject.models.UserContext;
import com.master.seleniumproject.pages.login.LoginPage;
import com.master.seleniumproject.steps.login.LoginPageSteps;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import java.net.MalformedURLException;
import java.net.URL;
import java.time.Duration;

import static org.testng.Assert.assertEquals;
import static org.testng.Assert.assertTrue;

public class BooksUiTest {

    private WebDriver driver;
    private LoginPageSteps loginPageSteps;
    private UserContext userContext;

    @BeforeMethod
    public void setUp() throws MalformedURLException {
        String host = System.getenv("HOST");
        String username = System.getenv("USERNAME");
        String password = System.getenv("PASSWORD");
        String baseUrl = "http://" + host + ":8080";
        boolean isHeadless = Boolean.parseBoolean(System.getenv("IS_HEADLESS"));
        boolean isRemote = Boolean.parseBoolean(System.getenv("IS_REMOTE"));

        ChromeOptions options = new ChromeOptions();
        // Fix the issue https://github.com/SeleniumHQ/selenium/issues/11750
        options.addArguments("--remote-allow-origins=*");
        if (isHeadless) options.addArguments("--headless=new");
        if (isRemote) {
            options.addArguments("--no-sandbox");
            options.addArguments("--disable-dev-shm-usage");
            driver = new RemoteWebDriver(new URL("http://selenium:4444/wd/hub"), options);
        } else {
            driver = new ChromeDriver(options);
        }
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
        driver.get(baseUrl);

        loginPageSteps = new LoginPageSteps(driver);
        userContext = new UserContext(username, password);
    }

    @AfterMethod
    public void tearDown() {
        driver.quit();
    }

    @Test
    public void createBook() {
        this.loginPageSteps.logIn(userContext);
    }

}
