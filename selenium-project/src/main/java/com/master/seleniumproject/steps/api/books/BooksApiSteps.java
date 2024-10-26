package com.master.seleniumproject.steps.api.books;

import com.master.seleniumproject.controllers.BooksController;
import com.master.seleniumproject.models.Book;
import com.master.seleniumproject.models.UserContext;

import static org.apache.http.HttpStatus.SC_OK;

public class BooksApiSteps {
    BooksController booksController;

    public BooksApiSteps() {
        this.booksController = new BooksController();
    }
    public void getBooks(UserContext userContext) {

         Book[] res = booksController.getBooks(userContext)
                .then()
                .statusCode(SC_OK)
                .extract()
                .response()
                .body().as(Book[].class);
        System.out.println(res.toString());

//        return Arrays.stream(res.getBody()
//                .as(Book[].class)).toList();
    }
}
