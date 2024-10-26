package com.master.seleniumproject.pages.books;

import com.master.seleniumproject.pages.AbstractPage;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class BookForm extends AbstractPage  {

    @FindBy(css = "input[id='title']")
    private WebElement titleInput;

    @FindBy(css = "input[id='author']")
    private WebElement authorInput;

    @FindBy(css = "input[id='genre']")
    private WebElement genreInput;

    @FindBy(css = "input[id='year']")
    private WebElement yearInput;

    @FindBy(css = "button[id='add-update-form-button']")
    private WebElement addUpdateButton;

    @FindBy(css = "button[id='cancel-button']")
    private WebElement cancelButton;

    public BookForm(WebDriver driver) {
        super(driver);
        PageFactory.initElements(driver, this);
    }

    public void fillTtitleInput(String ttitle) {
        this.fillInput(this.titleInput, ttitle);
    }

    public void fillAuthorInput(String author) {
        this.fillInput(this.authorInput, author);
    }

    public void fillGenreInput(String genre) {
        this.fillInput(this.genreInput, genre);
    }

    public void fillYearInput(String year) {
        this.fillInput(this.yearInput, year);
    }

    public void clickAddUpdateButton() {
        this.addUpdateButton.click();
    }

    public void clickCancelButton() {
        this.cancelButton.click();
    }
}
