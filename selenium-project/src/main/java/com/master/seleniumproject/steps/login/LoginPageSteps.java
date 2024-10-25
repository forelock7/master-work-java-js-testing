package com.master.seleniumproject.steps.login;

import com.master.seleniumproject.models.UserContext;
import com.master.seleniumproject.pages.login.LoginPage;
import org.openqa.selenium.WebDriver;

public class LoginPageSteps {

    private final LoginPage loginPage;

    public LoginPageSteps(WebDriver driver) {
        this.loginPage = new LoginPage(driver);
    }

    public void logIn(UserContext userContext) {
        this.fillUsernameInput(userContext.getUsername());
        this.fillPasswordInput(userContext.getPassword());
        this.clickLoginButton();
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
