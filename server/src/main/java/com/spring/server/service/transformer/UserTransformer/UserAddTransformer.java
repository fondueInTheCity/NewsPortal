package com.spring.server.service.transformer.UserTransformer;

import com.spring.server.model.User;
import com.spring.server.service.dto.UserDto.UserAddDto;
import org.springframework.stereotype.Component;

@Component
public class UserAddTransformer {

    public User makeModel(UserAddDto userAddDto) {
        User user = new User();
        user.setFirstName(userAddDto.getFirstName());
        user.setLastName(userAddDto.getLastName());
        user.setUsername(userAddDto.getUsername());
        user.setPassword(userAddDto.getPassword());
        user.setEmail(userAddDto.getEmail());
        return user;
    }
}
