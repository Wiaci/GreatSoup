package com.greatsoup.soup.services;

import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.SessionScope;

import java.util.Random;

@Component
@SessionScope
public class UserInfo {

    private String login;
    private final int id;

    public UserInfo() {
        login = "";
        id = new Random().nextInt(100);
    }

    public String getLogin() {
        System.out.println(id + " id get " + login);
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
        System.out.println(id + " id set " + login);
    }
}
