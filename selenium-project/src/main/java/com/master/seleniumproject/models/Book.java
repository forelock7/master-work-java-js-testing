package com.master.seleniumproject.models;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Book {

    @JsonProperty("id")
    private int id;
    @JsonProperty("title")
    private String title;
    @JsonProperty("author")
    private String author;
    @JsonProperty("genre")
    private String genre;
    @JsonProperty("year")
    private int year;

    public Book() {
    }

    public Book(String title, String author, String genre, int year) {
        this.title = title;
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

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
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

    // Optionally override equals and hashCode for proper comparison
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Book book = (Book) o;

        if (year != book.year) return false;
        if (!title.equals(book.title)) return false;
        if (!author.equals(book.author)) return false;
        return genre.equals(book.genre);
    }

    @Override
    public int hashCode() {
        int result = title.hashCode();
        result = 31 * result + author.hashCode();
        result = 31 * result + genre.hashCode();
        result = 31 * result + year;
        return result;
    }

    // Optionally, override toString() for better error messages
    @Override
    public String toString() {
        return "Book{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", author='" + author + '\'' +
                ", genre='" + genre + '\'' +
                ", year=" + year +
                '}';
    }
}
