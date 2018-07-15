package com.spring.server.controller;

import com.spring.server.service.AuthenticationService;
import com.spring.server.service.UserService;
import com.spring.server.service.dto.ErrorDto.ErrorDto;
import com.spring.server.service.dto.LoginDto.LoginRequestDto;
import com.spring.server.service.dto.LoginDto.LoginResponseDto;
import com.spring.server.service.dto.UserDto.UserAddDto;
import lombok.RequiredArgsConstructor;
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
    public LoginResponseDto login(@RequestBody LoginRequestDto loginRequestDto) {
        return authenticationService.login(loginRequestDto);
    }

    @PostMapping("/registration")
    public ErrorDto addUser(@RequestBody UserAddDto userAddDto) {
         return userService.addUser(userAddDto);
    }

    @GetMapping("/activate/{code}")
    public void activate(@PathVariable String code) {
        userService.activateUser(code);
    }

    @PostMapping("/sendCodeNewPassword")
    public void codeNewPassword(@RequestBody String email) {
        userService.sendActivateNewPassword(email);
    }

    @PostMapping("/changeNewPassword/{code}")
    public void changePassword(@PathVariable String code, @RequestBody String password) {
        userService.newPassword(code, password);
    }
}
