package com.spring.server.controller;

import com.spring.server.model.Language;
import com.spring.server.model.Theme;
import com.spring.server.service.UserService;
import com.spring.server.service.dto.UserEditDto;
import com.spring.server.service.dto.UserListDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
@RequestMapping(value = "/users", produces = MediaType.APPLICATION_JSON_VALUE)
public class UserController {

    private final UserService userService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<UserListDto> findAll(
    ) {
        return this.userService.findAll();
    }

    @GetMapping("/getThemes")
    @ResponseStatus(HttpStatus.OK)
    public List<Theme> getThemes(
    ) {
        return this.userService.getThemes();
    }

    @GetMapping("/getLanguages")
    @ResponseStatus(HttpStatus.OK)
    public List<Language> getLanguages(
    ) {
        return this.userService.getLanguages();
    }

    @GetMapping("/{username}")
    @ResponseStatus(HttpStatus.OK)
    public UserEditDto findUserByUsername(@PathVariable String username) {
        return this.userService.findUserByUsername(username);
    }

    @PostMapping("/edit")
    @ResponseStatus(HttpStatus.OK)
    public void editUser(@RequestBody UserEditDto user) {
        this.userService.editUser(user);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteUser(@PathVariable Long id
    ) {
        this.userService.deleteUser(id);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @RequestMapping(value = "/block/{id}", method = RequestMethod.POST, produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    public void blockUser(@PathVariable Long id, @RequestBody Map<String, String> blockStatus
    ) {
        boolean blockedStatus = Boolean.parseBoolean(blockStatus.get("blocked"));
        this.userService.blockUser(id, blockedStatus);
    }
}
