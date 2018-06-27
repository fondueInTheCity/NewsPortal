package com.spring.server.service.dto;

import com.spring.server.model.UserRole;
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

}
