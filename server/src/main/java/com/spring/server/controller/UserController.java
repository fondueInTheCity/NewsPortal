package com.spring.server.controller;

import com.dropbox.core.DbxException;
import com.spring.server.model.Language;
import com.spring.server.model.Theme;
import com.spring.server.service.UserService;
import com.spring.server.service.dto.UserDto.UserEditDto;
import com.spring.server.service.dto.UserDto.UserListDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
@RequestMapping(value = "/users", produces = MediaType.APPLICATION_JSON_VALUE)
public class UserController {

    private final UserService userService;

    @PreAuthorize("hasRole('ROLE_ADMIN')")
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

    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_WRITTER') or hasRole('ROLE_READER')")
    @PostMapping("/setUserLanguage/{username}")
    @ResponseStatus(value = HttpStatus.OK)
    public void setUserLanguage(@PathVariable String username, @RequestBody Language language) {
        this.userService.setLanguage(username, language);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_WRITTER') or hasRole('ROLE_READER')")
    @PostMapping("/setUserTheme/{username}")
    @ResponseStatus(value = HttpStatus.OK)
    public void setUserTheme(@PathVariable String username, @RequestBody Theme theme) {
        this.userService.setTheme(username, theme);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/setUserRole/{idUser}")
    public void setUserRole(@PathVariable Long idUser, @RequestBody String role) {
        this.userService.setRole(idUser, role);
    }

    @GetMapping("/{username}")
    public UserEditDto findUserByUsername(@PathVariable String username) {
        return this.userService.findUserByUsername(username);
    }

//    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/edit")
    public void editUser(@RequestBody UserEditDto user) {
        this.userService.editUser(user);
    }

//    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/editImage/{idUser}")
    public void editUserImage(@PathVariable Long idUser, @RequestParam("file") MultipartFile image) throws DbxException {
        this.userService.setUsersImage(idUser, image);
        //    @RequestMapping(value = "/edit", method = RequestMethod.POST, consumes = "multipart/form-data")
        //    public void editUser(@RequestBody MultipartFile image){
        //    this.userService.editUser(user);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{idUser}")
    public void deleteUser(@PathVariable Long idUser
    ) {
        this.userService.deleteUser(idUser);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @RequestMapping(value = "/block/{idUser}", method = RequestMethod.POST, produces = "application/json")
    public void blockUser(@PathVariable Long idUser, @RequestBody Map<String, String> blockStatus
    ) {
        boolean blockedStatus = Boolean.parseBoolean(blockStatus.get("blocked"));
        this.userService.blockUser(idUser, blockedStatus);
    }

    @RequestMapping("/getImage/{username}")
    @ResponseStatus(HttpStatus.OK)
    public String getImage(@PathVariable String username) {
        return this.userService.getImage(username);
    }

    @GetMapping("/unique/{username}")
    @ResponseStatus(HttpStatus.OK)
    public boolean uniqueUsername(@PathVariable String username) {
        return this.userService.uniqueUsername(username);
    }
}
