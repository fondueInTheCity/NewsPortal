package com.spring.server.controller;

import com.spring.server.service.AuthenticationService;
import com.spring.server.service.dto.AuthUserDto;
import com.spring.server.service.dto.LoginRequestDto;
import com.spring.server.service.dto.LoginResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/auth", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping(value = "/login")
    @ResponseStatus(value = HttpStatus.OK)
    public LoginResponseDto login(
            @RequestBody final LoginRequestDto loginRequestDto
    ) {
        return this.authenticationService.login(loginRequestDto);
    }

    @GetMapping(value = "/me")
    @ResponseStatus(value = HttpStatus.OK)
    public AuthUserDto me() {
        return this.authenticationService.getMe();
    }
}
