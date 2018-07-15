package com.spring.server.service.dto.LoginDto;

import com.spring.server.model.User;
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
    private long userId;
    private String username;
    private String userRole;
    private String themeName;
    private String languageName;

    public LoginResponseDto(String token,
                            ErrorDto errorDto,
                            User user) {
        this.token = token;
        this.errorDto = errorDto;
        if (user != null) {
            this.userId = user.getId();
            this.username = user.getUsername();
            this.userRole = user.getRole().toString();
            this.themeName = user.getTheme().getName();
            this.languageName = user.getLanguage().getName();
        }
    }
}
