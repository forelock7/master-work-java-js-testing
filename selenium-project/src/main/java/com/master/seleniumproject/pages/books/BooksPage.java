package com.master.seleniumproject.pages.books;

import com.master.seleniumproject.pages.AbstractPage;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class BooksPage extends AbstractPage {

    @FindBy(css = "*[data-testid='log-out-link']")
    private WebElement logOutLink;

    public BooksPage(WebDriver driver) {
        super(driver);
        PageFactory.initElements(driver, this);
    }

    public void waitForLogOutLinkIsVisible() {
        // TO DO: implement fluent wait
    }
}
