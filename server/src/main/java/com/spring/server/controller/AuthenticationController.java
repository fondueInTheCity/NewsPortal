package com.spring.server.controller;

import com.spring.server.model.User;
import com.spring.server.service.AuthenticationService;
import com.spring.server.service.UserService;
import com.spring.server.service.dto.LoginDto.LoginRequestDto;
import com.spring.server.service.dto.LoginDto.LoginResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RequestMapping(value = "/auth", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;
    private final UserService userService;

    @PostMapping("/login")
    @ResponseStatus(HttpStatus.OK)
    public LoginResponseDto login(@RequestBody LoginRequestDto loginRequestDto) {
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

    @PostMapping("/sendCodeNewPassword")
    @ResponseStatus(HttpStatus.OK)
    public void codeNewPassword(@RequestBody String email) {
        userService.sendActivateNewPassword(email);
    }

    @PostMapping("/changeNewPassword/{code}")
    @ResponseStatus(HttpStatus.OK)
    public void changePassword(@PathVariable String code, @RequestBody String password ) {
        userService.newPassword(code, password);
    }
}
