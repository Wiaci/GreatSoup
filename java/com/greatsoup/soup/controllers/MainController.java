package com.greatsoup.soup.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class MainController {

    @GetMapping("/")
    public String greeting(Model model) {
        model.addAttribute("title", "Great Soup");
        return "greeting";
    }

    @GetMapping("/registration")
    public String register(Model model) {
        model.addAttribute("title", "Great Soup");
        return "greeting";
    }

    @GetMapping("/main")
    public String main(Model model) {
        model.addAttribute("title", "Great Soup");
        return "greeting";
    }
}
