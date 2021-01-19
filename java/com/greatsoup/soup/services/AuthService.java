package com.greatsoup.soup.services;

import com.greatsoup.soup.entities.User;
import com.greatsoup.soup.repositories.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.SessionScope;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@SessionScope
public class AuthService {

    private final UserRepository userRepository;
    private final UserInfo userInfo;

    public AuthService(UserRepository userRepository, UserInfo userInfo) {
        this.userRepository = userRepository;
        this.userInfo = userInfo;
    }

    private boolean isInBase(String login) {
        return userRepository.existsById(login);
    }

    private void addUser(String login, String password) {
        userRepository.save(
                new User(login, password.hashCode()));
    }

    public Map<String, String> checkLoginAndPassword(Map<String, String> request) {
        Map<String, String> response = new HashMap<>();
        String login = request.get("login");
        String password = request.get("password");
        Optional<User> userOptional = userRepository.findById(login);
        if (userOptional.isPresent()) {
            response.put("ident", "true");
            User user = userOptional.get();
            if (password.hashCode() == user.getPassword()) {
                response.put("auth", "true");
                userInfo.setLogin(login);
                System.out.println(userInfo.getLogin() + " logged");
            }
            else response.put("auth", "false");
        } else {
            response.put("ident", "false");
            response.put("auth", "false");
        }
        return response;
    }

    public Map<String, String> register(Map<String, String> request) {
        Map<String, String> response = new HashMap<>();
        String login = request.get("login");
        String password = request.get("password");
        if (!isInBase(login)) {
            response.put("in", "false");
            addUser(login, password);
            userInfo.setLogin(login);
            System.out.println(login + " register");
            response.put("added", "true");
        } else {
            response.put("in", "true");
            response.put("added", "false");
        }
        return response;
    }

    public Map<String, String> checkIfLogged() {
        Map<String, String> response = new HashMap<>();
        if (userInfo.getLogin().isEmpty()) {
            response.put("log", "false");
        } else {
            System.out.println("checkLog " + userInfo.getLogin());
            response.put("log", "true");
        }
        return response;
    }

    public void logout() {
        userInfo.setLogin("");
        System.out.println("logout");
    }

}
