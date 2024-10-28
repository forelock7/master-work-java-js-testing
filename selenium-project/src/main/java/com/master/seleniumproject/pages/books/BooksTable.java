package com.master.seleniumproject.pages.books;

import com.master.seleniumproject.pages.AbstractPage;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

import java.util.List;

public class BooksTable extends AbstractPage {

    @FindBy(css = "tbody[id='books-list']")
    private WebElement tableBody;

    @FindBy(css = "tbody[id='books-list'] tr")
    private List<WebElement> tableRow;

    @FindBy(css = "button[class='update-book-button']")
    private List<WebElement> editBookButton;

    @FindBy(css = "button[class='delete-book-button']")
    private List<WebElement> deleteBookButton;

    public BooksTable(WebDriver driver) {
        super(driver);
        PageFactory.initElements(driver, this);
    }

    public List<String> getRowsTextContents() {
        return this.tableRow.stream().map(WebElement::getText).toList();
    }
}
