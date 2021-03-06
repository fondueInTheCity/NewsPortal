package com.spring.server.service.transformer.UserTransformer;

import com.spring.server.model.User;
import com.spring.server.service.dto.UserDto.UserListDto;
import org.springframework.stereotype.Component;

@Component
public class UserListTransformer {

    public UserListDto makeDto(final User user) {
        UserListDto dto = new UserListDto();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());
        dto.setRole(user.getRole().name());
        dto.setBlocked(user.isBlocked());
        dto.setDeleted(user.isDeleted());
        return dto;
    }
}
