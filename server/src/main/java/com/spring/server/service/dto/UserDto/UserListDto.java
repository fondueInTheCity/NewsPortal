package com.spring.server.service.dto.UserDto;

import com.spring.server.service.dto.Dto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserListDto implements Dto {

    private long id;
    private String username;
    private String email;
    private String role;
    private boolean isBlocked;
    private boolean isDeleted;

}
