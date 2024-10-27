package com.master.seleniumproject.steps.ui.books;

import com.master.seleniumproject.pages.books.BooksTable;
import org.assertj.core.api.Assertions;
import org.awaitility.Awaitility;
import org.openqa.selenium.WebDriver;

import java.util.Arrays;
import java.util.concurrent.TimeUnit;

public class BooksTableSteps {
    private final BooksTable booksTable;

    public BooksTableSteps(WebDriver driver) {
        this.booksTable = new BooksTable(driver);
    }

    private String[] getRowsTextAndModify() {
        String[] actualRows = this.booksTable.getRowsTextContents();
        return Arrays.stream(actualRows)
                .map(str -> {
                    // Remove "Delete" and "Edit"
                    String cleanedString = str.replace("Delete", "").replace("Edit", "").trim();
                    // Remove the first number (everything up to the first space)
                    String[] parts = cleanedString.split(" ", 2); // Split into two parts: number and rest of the string
                    return parts[1]; // Return the rest of the string without the first number
                })
                .toArray(String[]::new);
    }

    public void verifyRowsArePresent(String[] rows) {
        Awaitility.await().atMost(10, TimeUnit.SECONDS)
                .pollInterval(500, TimeUnit.MILLISECONDS)
                .untilAsserted(() -> {
                    String[] actualRows = getRowsTextAndModify();
                    Assertions.assertThat(actualRows).contains(rows);
                });
    }

    public void verifyRowsAreAbsent(String[] rows) {
        Awaitility.await().atMost(10, TimeUnit.SECONDS)
                .pollInterval(500, TimeUnit.MILLISECONDS)
                .untilAsserted(() -> {
                    String[] actualRows = getRowsTextAndModify();
                    Assertions.assertThat(actualRows).doesNotContain(rows);
                });
    }
}
