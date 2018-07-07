package com.spring.server.service.dto.UserDto;

import com.spring.server.model.Language;
import com.spring.server.model.Theme;
import com.spring.server.model.UserRole;
import com.spring.server.service.dto.Dto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserEditDto implements Dto {

    private Long id;
    private String username;
    private UserRole role;
    private String firstName;
    private String lastName;
    private String country;
    private String city;
    private String bio;
    private String avatar;
    private boolean isDeleted;
    private boolean isBlocked;

    private Theme theme;
    private Language language;
}
