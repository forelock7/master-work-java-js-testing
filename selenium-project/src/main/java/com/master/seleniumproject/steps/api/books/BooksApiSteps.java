package com.master.seleniumproject.steps.api.books;

import com.master.seleniumproject.controllers.BooksController;
import com.master.seleniumproject.models.Book;
import com.master.seleniumproject.models.UserContext;
import org.assertj.core.api.Assertions;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.apache.http.HttpStatus.SC_CREATED;
import static org.apache.http.HttpStatus.SC_NO_CONTENT;
import static org.apache.http.HttpStatus.SC_OK;

public class BooksApiSteps {
    BooksController booksController;

    public BooksApiSteps() {
        this.booksController = new BooksController();
    }

    public List<Book> getBooks(UserContext userContext) {
         Book[] books = booksController.getBooks(userContext)
                .then()
                .statusCode(SC_OK)
                .extract()
                .response()
                .body().as(Book[].class);
         return Arrays.asList(books);
    }

    public Book getBookByTitle(UserContext userContext, String bookTitle) {
        List<Book> books = this.getBooks(userContext);  // Assuming getBooks returns Book[]

        // Stream through the books and filter by title
        Optional<Book> book = books.stream()
                .filter(b -> bookTitle.equals(b.getTitle()))  // Filter by book title
                .findFirst();  // Return the first match if present

        // Return the book if present, or throw an exception (or handle differently)
        return book.orElse(null);
    }

    public void createBook(UserContext userContext, Book book) {
        booksController.createBook(userContext, book)
                .then()
                .statusCode(SC_CREATED);
    }

    public void deleteBookById(UserContext userContext, int bookId) {
        booksController.deleteBook(userContext, bookId)
                .then()
                .statusCode(SC_NO_CONTENT);
    }

    public void deleteBookByTitle(UserContext userContext, String bookTitle) {
        Book book = this.getBookByTitle(userContext, bookTitle);
        if (book != null) {
            this.deleteBookById(userContext, book.getId());
        } else {
            System.out.println(bookTitle + " book not found");
        }
    }

    public void updateBook(UserContext userContext, Book book) throws Exception {
        int bookId;
        Book updatedBook;

        // Check if book has an id
        if (book.getId() != null) {
            // If id is present, use the existing id
            bookId = book.getId();

            // Create a new Book object without the id (manually copy the fields)
            updatedBook = new Book(book.getTitle(), book.getAuthor(), book.getGenre(), book.getYear());
        } else {
            // If no id, find the book by title
            Book existingBook = getBookByTitle(userContext, book.getTitle());

            // If the book exists, use its id and the passed-in book's details for the update
            if (existingBook != null) {
                bookId = existingBook.getId();
                updatedBook = book;  // Use the original book (no need to modify fields here)
            } else {
                // Throw an exception if the book is not found
                throw new Exception("'" + book.getTitle() + "' book not found");
            }
        }

        booksController.updateBook(userContext, bookId, updatedBook)
                .then()
                .statusCode(SC_NO_CONTENT);
    }

    public void verifyBooksArePresent(UserContext userContext, List<Book> books) {
        List<Book> actualBooks = this.getBooks(userContext);
        List<Book> updatedBooks = actualBooks.stream()
                .map(book -> new Book(book.getTitle(), book.getAuthor(), book.getGenre(), book.getYear()))  // Create a new Book without the id
                .toList();
        Assertions.assertThat(updatedBooks).containsAll(books);
    }

    public void verifyBookIsPresent(UserContext userContext, Book book) {
        List<Book> actualBooks = this.getBooks(userContext);
        List<Book> updatedBooks = actualBooks.stream()
                .map(b -> new Book(b.getTitle(), b.getAuthor(), b.getGenre(), b.getYear()))  // Create a new Book without the id
                .toList();
        Assertions.assertThat(updatedBooks).contains(book);
    }
}
