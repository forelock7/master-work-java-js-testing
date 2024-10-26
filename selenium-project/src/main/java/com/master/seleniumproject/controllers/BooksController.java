package com.master.seleniumproject.controllers;

import com.master.seleniumproject.models.UserContext;
import io.restassured.response.Response;

import static io.restassured.RestAssured.given;

public class BooksController {
    private static final String BOOKS = "/api/books";

    public static Response getBooks(UserContext userContext) {
        return given()
                .queryParam("api_key", "your-api-key-here")
                .when()
                .get(BOOKS);
    }
}
