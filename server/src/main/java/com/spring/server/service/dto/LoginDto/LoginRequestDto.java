package com.spring.server.service.dto.LoginDto;

import com.spring.server.service.dto.Dto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoginRequestDto implements Dto {
    private String username;
    private String password;
}
