package com.spring.server.service.dto.UserDto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserAddDto {
    private String firstName;
    private String lastName;
    private String username;
    private String password;
    private String email;
}
