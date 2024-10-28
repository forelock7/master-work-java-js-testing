package com.master.seleniumproject.steps.ui.books;

import com.master.seleniumproject.pages.books.BooksTable;
import org.assertj.core.api.Assertions;
import org.awaitility.Awaitility;
import org.openqa.selenium.WebDriver;

import java.util.List;
import java.util.concurrent.TimeUnit;

public class BooksTableSteps {
    private final BooksTable booksTable;

    public BooksTableSteps(WebDriver driver) {
        this.booksTable = new BooksTable(driver);
    }

    private List<String> getRowsTextAndModify() {
        List<String> actualRows = this.booksTable.getRowsTextContents();
        return actualRows.stream().map(str -> {
                    // Remove "Delete" and "Edit"
                    String cleanedString = str.replace("Delete", "").replace("Edit", "").trim();
                    // Remove the first number (everything up to the first space)
                    String[] parts = cleanedString.split(" ", 2); // Split into two parts: number and rest of the string
                    return parts[1]; // Return the rest of the string without the first number
                })
                .toList();
    }

    public void verifyRowsArePresent(List<String> rows) {
        Awaitility.await().atMost(10, TimeUnit.SECONDS)
                .pollInterval(500, TimeUnit.MILLISECONDS)
                .untilAsserted(() -> {
                    List<String> actualRows = getRowsTextAndModify();
                    Assertions.assertThat(actualRows).containsAll(rows);
                });
    }

    public void verifyRowsAreAbsent(List<String> rows) {
        Awaitility.await().atMost(10, TimeUnit.SECONDS)
                .pollInterval(500, TimeUnit.MILLISECONDS)
                .untilAsserted(() -> {
                    List<String> actualRows = getRowsTextAndModify();
                    Assertions.assertThat(actualRows).doesNotContainAnyElementsOf(rows);
                });
    }
}
