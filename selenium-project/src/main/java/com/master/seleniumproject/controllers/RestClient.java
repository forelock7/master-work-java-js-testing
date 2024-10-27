package com.master.seleniumproject.controllers;

import com.master.seleniumproject.models.UserContext;
import io.restassured.RestAssured;
import io.restassured.specification.RequestSpecification;

import static com.master.seleniumproject.config.EnvConfigs.BASE_URL;

public class RestClient {

    public RestClient() {
        RestAssured.baseURI = BASE_URL;
    }

    public RequestSpecification getContext(UserContext userContext) {
        return RestAssured.given().header("Authorization", "Bearer " + userContext.getToken());
    }
}
