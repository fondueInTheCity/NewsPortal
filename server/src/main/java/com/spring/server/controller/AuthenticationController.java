package com.spring.server.controller;

import com.spring.server.model.User;
import com.spring.server.service.AuthenticationService;
import com.spring.server.service.UserService;
import com.spring.server.service.dto.AuthUserDto;
import com.spring.server.service.dto.LoginRequestDto;
import com.spring.server.service.dto.LoginResponseDto;
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



    @PostMapping(value = "/login")
    @ResponseStatus(value = HttpStatus.OK)
    public LoginResponseDto login(
            @RequestBody final LoginRequestDto loginRequestDto
    ) {
        return this.authenticationService.login(loginRequestDto);
    }

//    @CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
    @PostMapping(value = "/registration")
    @ResponseStatus(value = HttpStatus.OK)
    public void addUser(@RequestBody User user) {
         this.userService.addUser(user);
    }

    @PostMapping("/activate/{code)")
    public void activate(@PathVariable String code) {
        this.userService.activateUser(code);
    }

    @GetMapping(value = "/me")
    @ResponseStatus(value = HttpStatus.OK)
    public AuthUserDto me() {
        return this.authenticationService.getMe();
    }
}
