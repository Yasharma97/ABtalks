package com.example.ABtalks.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewController {

    @GetMapping(value = {"/", "/dashboard", "/day/{id}"})
    public String forwardToFrontend() {
        return "forward:/index.html";
    }
}
