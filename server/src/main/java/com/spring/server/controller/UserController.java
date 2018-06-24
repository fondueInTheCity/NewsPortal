package com.spring.server.controller;

import com.spring.server.model.User;
import com.spring.server.service.UserService;
import com.spring.server.service.dto.UserListDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
@RequestMapping(value = "/users", produces = MediaType.APPLICATION_JSON_VALUE)
public class UserController {

    private final UserService userService;

    @GetMapping
    @ResponseStatus(value = HttpStatus.OK)
    public List<UserListDto> findAll(
    ) {
        return this.userService.findAll();
    }

    @GetMapping("/{username}")
    @ResponseStatus(value = HttpStatus.OK)
    public User findUserByUsername(@PathVariable(value = "username") String username) {
        return this.userService.findUserByUsername(username);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    @ResponseStatus(value = HttpStatus.OK)
    public void delete(@PathVariable(name = "id") Long id
    ) {
        this.userService.delete(id);
    }
}
