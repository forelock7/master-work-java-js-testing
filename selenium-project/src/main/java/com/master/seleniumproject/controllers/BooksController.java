package com.master.seleniumproject.controllers;

import com.master.seleniumproject.models.UserContext;
import io.restassured.response.Response;

public class BooksController {
    private static final String BOOKS = "/api/books";

    RestClient restClient;

    public BooksController() {
        this.restClient = new RestClient();
    }

    public Response getBooks(UserContext userContext) {
        return restClient.getContext(userContext)
                .when()
                .get(BOOKS);
    }
}
