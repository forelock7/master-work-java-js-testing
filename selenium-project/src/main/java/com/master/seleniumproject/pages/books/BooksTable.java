package com.master.seleniumproject.pages.books;

import com.master.seleniumproject.pages.AbstractPage;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;
import java.util.List;
import java.util.stream.Collectors;

public class BooksTable extends AbstractPage {

    private final WebDriver driver;
    private WebDriverWait wait;
    // Define locators as constants or instance variables
    private final String bookIdCellSelector = "tr:has(td[data-bookid='%d'])"; // %d will be replaced with the bookId
    private final String editButtonSelector = "button.update-book-button";
    private final String deleteButtonSelector = "button.delete-book-button";

    @FindBy(css = "tbody[id='books-list'] tr")
    private List<WebElement> tableRows;

    public BooksTable(WebDriver driver) {
        super(driver);
        PageFactory.initElements(driver, this);
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    public void openLoginPage(String loginPageUrl) {
        driver.get(loginPageUrl);
    }

    public List<String> getRowsTextContents() {
        return tableRows.stream()
                .map(WebElement::getText)
                .collect(Collectors.toList());
    }

    public void clickEditBookButton(int bookId) {
        String bookIdCellCss = String.format(bookIdCellSelector, bookId); // Replacing %d with the actual bookId
        WebElement bookRow = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector(bookIdCellCss)));

        // Wait until the delete button is visible and clickable
        WebElement deleteButton = bookRow.findElement(By.cssSelector(editButtonSelector));
        wait.until(ExpectedConditions.elementToBeClickable(deleteButton)).click();
    }

    public void clickDeleteBookButton(int bookId) {
        String bookIdCellCss = String.format(bookIdCellSelector, bookId); // Replacing %d with the actual bookId
        WebElement bookRow = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector(bookIdCellCss)));

        // Wait until the delete button is visible and clickable
        WebElement deleteButton = bookRow.findElement(By.cssSelector(deleteButtonSelector));
        wait.until(ExpectedConditions.elementToBeClickable(deleteButton)).click();
    }
}
