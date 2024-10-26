package com.master.seleniumproject.models;

public class Book {

    private int id;
    private String tittle;
    private String author;
    private String genre;
    private int year;

    public Book(String tittle, String author, String genre, int year) {
        this.tittle = tittle;
        this.author = author;
        this.genre = genre;
        this.year = year;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTittle() {
        return tittle;
    }

    public void setTittle(String tittle) {
        this.tittle = tittle;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public int getYear() {
        return year;
    }

    public void setYear(short year) {
        this.year = year;
    }
}
