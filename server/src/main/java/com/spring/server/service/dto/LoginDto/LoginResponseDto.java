package com.spring.server.service.dto.LoginDto;

import com.spring.server.service.dto.Dto;
import com.spring.server.service.dto.ErrorDto.ErrorDto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class LoginResponseDto implements Dto {
    private String token;
    private ErrorDto errorDto;

    public LoginResponseDto(String token, ErrorDto errorDto) {
        this.token = token;
        this.errorDto = errorDto;
    }
}
