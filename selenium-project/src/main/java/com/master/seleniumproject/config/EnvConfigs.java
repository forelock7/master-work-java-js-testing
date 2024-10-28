package com.master.seleniumproject.config;

public class EnvConfigs {
    public static final String BASE_URL = System.getenv("BASE_URL");
    public static final String USERNAME = System.getenv("USERNAME");
    public static final String PASSWORD = System.getenv("PASSWORD");
    public static final boolean IS_HEADLESS = Boolean.parseBoolean(System.getenv("IS_HEADLESS"));
}
