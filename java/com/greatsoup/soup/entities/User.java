package com.greatsoup.soup.entities;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity(name="users")
public class User {

    public User() {}

    public User(String login, int password) {
        this.login = login;
        this.password = password;
    }

    @Id
    @Getter
    @Setter
    private String login;

    @Setter
    private int password;

    @Override
    public String toString() {
        return "User{" +
                "login='" + login + '\'' +
                '}';
    }

    public int getPassword() {
        return password;
    }
}
