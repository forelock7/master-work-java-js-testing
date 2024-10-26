package com.master.seleniumproject.pages.login;
import com.master.seleniumproject.pages.AbstractPage;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class LoginPage extends AbstractPage {
    @FindBy(css = "input[id='email']")
    private WebElement usernameInput;

    @FindBy(css = "input[id='password']")
    public WebElement passwordInput;

    @FindBy(css = "button[type='submit']")
    private WebElement loginButton;

    public LoginPage(WebDriver driver) {
        super(driver);
        PageFactory.initElements(driver, this);
    }

    public void fillUsernameInput(String username) {
        this.fillInput(this.usernameInput, username);
    }

    public void fillPasswordInput(String username) {
        this.fillInput(this.passwordInput, username);
    }

    public void clickLoginButton() {
        this.loginButton.click();
    }

}
