package com.spring.server.service.transformer;

import com.spring.server.model.User;
import com.spring.server.service.dto.UserEditDto;
import org.springframework.stereotype.Component;

@Component
public class UserEditTransformer {

    public UserEditDto makeDto(final User user) {
        UserEditDto dto = new UserEditDto();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setRole(user.getRole());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setCountry(user.getCountry());
        dto.setCity(user.getCity());
        dto.setBio(user.getBio());
        dto.setAvatar(user.getAvatar());
        return dto;
    }

    public User mergeUserData(User user, UserEditDto editDto) {
        user.setUsername(editDto.getUsername());
        user.setRole(editDto.getRole());
        user.setFirstName(editDto.getFirstName());
        user.setLastName(editDto.getLastName());
        user.setCountry(editDto.getCountry());
        user.setCity(editDto.getCity());
        user.setBio(editDto.getBio());
        user.setAvatar(editDto.getAvatar());
        return user;
    }
}
