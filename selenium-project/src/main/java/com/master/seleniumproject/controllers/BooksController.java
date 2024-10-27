package com.master.seleniumproject.controllers;

import com.master.seleniumproject.models.Book;
import com.master.seleniumproject.models.UserContext;
import io.restassured.response.Response;

public class BooksController {
    private static final String BOOKS = "/api/books";

    private RestClient restClient;

    public BooksController() {
        this.restClient = new RestClient();
    }

    public Response getBooks(UserContext userContext) {
        return restClient.getContext(userContext)
                .when()
                .get(BOOKS);
    }

    public Response createBook(UserContext userContext, Book book) {
        return restClient.getContext(userContext)
                .body(book)
                .when()
                .post(BOOKS);
    }

    public Response updateBook(UserContext userContext, int bookId, Book book) {
        return restClient.getContext(userContext)
                .body(book)
                .when()
                .put(BOOKS + "/" + bookId);
    }

    public Response deleteBook(UserContext userContext, int bookId) {
        return restClient.getContext(userContext)
                .when()
                .delete(BOOKS + "/" + bookId);
    }
}
