package com.spring.server.service.dto.LoginDto;

import com.spring.server.service.dto.Dto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class LoginResponseDto implements Dto {
    private String token;

    public LoginResponseDto(final String token) {
        this.token = token;
    }
}
