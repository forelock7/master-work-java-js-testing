package com.master.seleniumproject;

import com.master.seleniumproject.models.UserContext;
import com.master.seleniumproject.pages.login.LoginPage;
import com.master.seleniumproject.steps.login.LoginPageSteps;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import java.time.Duration;

import static org.testng.Assert.assertEquals;
import static org.testng.Assert.assertTrue;

public class BooksUiTest {

    private WebDriver driver;
    private LoginPageSteps loginPageSteps;
    private UserContext userContext;

    @BeforeMethod
    public void setUp() {
        ChromeOptions options = new ChromeOptions();
        // Fix the issue https://github.com/SeleniumHQ/selenium/issues/11750
        options.addArguments("--remote-allow-origins=*");
        driver = new ChromeDriver(options);
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
        driver.get("http://localhost:8080/");

        loginPageSteps = new LoginPageSteps(driver);
        userContext = new UserContext("vova@gmail.com", "1234");
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
