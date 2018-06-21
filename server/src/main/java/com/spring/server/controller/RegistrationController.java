package com.spring.server.controller;

import com.spring.server.model.User;
import com.spring.server.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(value = "/registration")
public class RegistrationController {
    private final UserService userService;

    RegistrationController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public void addUser(@RequestParam User user) {
        this.userService.addUser(user);
    }

    @GetMapping("/activate/{code)")
    public void activate(@PathVariable String code) {
        this.userService.activateUser(code);
    }
}
