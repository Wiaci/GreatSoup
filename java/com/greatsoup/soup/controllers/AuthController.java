package com.greatsoup.soup.controllers;

import com.greatsoup.soup.services.AuthService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/post")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public Map<String, String> register(@RequestBody Map<String, String> message) {
        return authService.register(message);
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Map<String, String> message) {
        return authService.checkLoginAndPassword(message);
    }

    @PostMapping("/checkIfLogged")
    public Map<String, String> checkIfLogged() {
        return authService.checkIfLogged();
    }

    @PostMapping("/logout")
    public void logout() {
        authService.logout();
    }
}
