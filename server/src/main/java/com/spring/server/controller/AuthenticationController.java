package com.spring.server.controller;

import com.spring.server.model.User;
import com.spring.server.service.AuthenticationService;
import com.spring.server.service.UserService;
import com.spring.server.service.dto.LoginRequestDto;
import com.spring.server.service.dto.LoginResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.annotation.RequestScope;

@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RequestMapping(value = "/auth", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;
    private final UserService userService;

    @PostMapping("/login")
    @ResponseStatus(HttpStatus.OK)
    public LoginResponseDto login(
            @RequestBody final LoginRequestDto loginRequestDto) {
        return authenticationService.login(loginRequestDto);
    }

    @PostMapping("/registration")
    @ResponseStatus(HttpStatus.OK)
    public void addUser(@RequestBody User user) {
         userService.addUser(user);
    }

    @GetMapping("/activate/{code}")
    @ResponseStatus(HttpStatus.OK)
    public void activate(@PathVariable String code) {
        userService.activateUser(code);
    }

    @GetMapping("/myPasswordUsername/{username}")
    @ResponseStatus(HttpStatus.OK)
    public void rememberPasswordUsername(@PathVariable String username) {
        userService.sendPasswordUsername(username);
    }

    @GetMapping("/myPasswordEmail/{email}")
    @ResponseStatus(HttpStatus.OK)
    public void rememberPasswordEmail(@PathVariable String email) {
        userService.sendPasswordEmail(email);
    }

    @GetMapping("/myUsernamePassword/{email}")
    @ResponseStatus(HttpStatus.OK)
    public void rememberUsernamePassword(@PathVariable String email) {
        userService.myUsernamePassword(email);
    }

    @GetMapping("/newPassword/{email}")
    @ResponseStatus(HttpStatus.OK)
    public void newPasswordActivate(@PathVariable String email) {
        userService.sendActivateNewPassword(email);
    }

    @PostMapping("/newPassword")
    @ResponseStatus(HttpStatus.OK)
    public void newPassword(@RequestBody String code, @RequestBody String password) {
        userService.newPassword(code, password);
    }
}
