package com.spring.server.service.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserListDto implements Dto {

    private long id;
    private String username;
    private String role;

}
