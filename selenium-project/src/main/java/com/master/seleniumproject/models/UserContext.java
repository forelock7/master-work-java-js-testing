package com.master.seleniumproject.models;

public class UserContext {
     private String username;
     private String password;

     public UserContext(String username, String password) {
          this.username = username;
          this.password = password;
     }

     public String getUsername() {
          return username;
     }

     public String getPassword() {
          return password;
     }
}
