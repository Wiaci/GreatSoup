package com.greatsoup.soup.controllers;

import com.greatsoup.soup.entities.Point;
import com.greatsoup.soup.services.FormService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/form")
public class FormController {

    private final FormService formService;

    public FormController(FormService formService) {
        this.formService = formService;
    }

    @PostMapping("/submit")
    public Map<String, String> submitPoint(@RequestBody Map<String, String> message) {
        return formService.submitPoint(message);
    }

    @PostMapping("/getUsersPoints")
    public List<Point> getUsersPoints() {
        return formService.getUsersPoints();
    }

    @PostMapping("/delete")
    public void delete() {
        formService.delete();
    }
}
