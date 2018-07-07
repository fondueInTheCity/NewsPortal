package com.spring.server.service.transformer.UserTransformer;


import com.spring.server.model.User;
import com.spring.server.service.dto.UserDto.AuthUserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AuthUserTransformer {

    public AuthUserDto makeDto(final User user) {
        AuthUserDto authUserDto = new AuthUserDto();
        authUserDto.setId(user.getId());
        authUserDto.setUsername(user.getUsername());
        authUserDto.setRole(user.getRole().name());
        return authUserDto;
    }

}
