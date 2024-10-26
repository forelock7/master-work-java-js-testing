package com.master.seleniumproject.steps.ui.login;

import com.master.seleniumproject.models.UserContext;
import com.master.seleniumproject.pages.books.BooksPage;
import com.master.seleniumproject.pages.login.LoginPage;
import org.assertj.core.api.Assertions;
import org.openqa.selenium.WebDriver;

public class LoginPageSteps {

    private final LoginPage loginPage;
    private final BooksPage booksPage;

    public LoginPageSteps(WebDriver driver) {
        this.loginPage = new LoginPage(driver);
        this.booksPage = new BooksPage(driver);
    }

    public void logIn(UserContext userContext) {
        this.fillUsernameInput(userContext.getUsername());
        this.fillPasswordInput(userContext.getPassword());
        this.clickLoginButton();

        Assertions.assertThat(this.booksPage.isLogOutLinkDisplayed()).isTrue();
    }

    public void fillUsernameInput(String username) {
        this.loginPage.fillUsernameInput(username);
    }

    public void fillPasswordInput(String username) {
        this.loginPage.fillPasswordInput(username);
    }

    public void clickLoginButton() {
        this.loginPage.clickLoginButton();
    }
}
