package com.spring.server.service;

import com.spring.server.model.User;
import com.spring.server.repository.UserRepository;
import com.spring.server.service.dto.UserListDto;
import com.spring.server.service.transformer.UserListTransformer;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final MailService mailService;
    private final UserListTransformer userListTransformer;

    @Transactional(readOnly = true)
    public List<UserListDto> findAll() {
        List<User> users = userRepository.findAll();

        List<UserListDto> userDtoList = new ArrayList<>();
        for (User user : users) {
            UserListDto dto = this.userListTransformer.makeDto(user);
            userDtoList.add(dto);
        }
        return userDtoList;
    }

    public void delete(Long id) {
        this.userRepository.deleteById(id);
    }

    public void addUser(User user) {
        if (!isNull(user)) {
            return;
        }

        encoder(user);
        if(!this.mailService.isNull(user)) {
            String message = String.format(
                    "Hallo, %s \n" +
                            "Welcome to RealTime Paint! Please, visit next link: http://localhost:8080/activate/%s",
                    user.getUsername(),
                    user.getActivationCode()
            );

            this.mailService.send(user.getEmail(), "Activation code", message);
        }
        this.userRepository.save(user);
    }

    public Boolean isNull(User user) {
        return this.userRepository.findByUsername(user.getUsername()) == null;
    }

    public void encoder(User user) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        user.setPassword(encoder.encode(user.getPassword()));
        user.setActivationCode(UUID.randomUUID().toString());
    }

    public boolean activateUser(String code) {
        User user = userRepository.findByActivationCode(code);
        if (isNull(user)){
            return false;
        }
        user.setActivationCode(null);
        userRepository.save(user);
        return  true;
    }
}
