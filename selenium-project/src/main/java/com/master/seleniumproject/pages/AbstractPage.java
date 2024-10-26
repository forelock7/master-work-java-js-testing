package com.master.seleniumproject.pages;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public abstract class AbstractPage {
    private WebDriver driver;

    public AbstractPage(WebDriver driver) {
        this.driver = driver;
    }

    protected void fillInput(WebElement element, String text) {
        element.clear();
        element.sendKeys(text);
    }

}
