package com.master.seleniumproject.config;

public class EnvConfigs {
    public static final String HOST = System.getenv("HOST");
    public static final int PORT = 8080;
    public static final String BASE_URL = "http://" + HOST + ":" + PORT;
    public static final String USERNAME = System.getenv("USERNAME");
    public static final String PASSWORD = System.getenv("PASSWORD");
    public static final boolean IS_HEADLESS = Boolean.parseBoolean(System.getenv("IS_HEADLESS"));
}
