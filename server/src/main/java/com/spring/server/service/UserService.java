package com.spring.server.service;

import com.spring.server.model.User;
import com.spring.server.model.UserRole;
import com.spring.server.repository.UserRepository;
import com.spring.server.service.dto.UserListDto;
import com.spring.server.service.transformer.UserListTransformer;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
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

    public void changes(Long id, User user) {
        Optional<User> userFromDB = this.userRepository.findById(id);
        if (userFromDB.isPresent()) {
            userFromDB.get().applyChanges(user);
            this.userRepository.save(userFromDB.get());
        }
    }

    public void activateUser(String code) {
        User user = this.userRepository.findByActivationCode(code);
        if (isNull(user)) {
            return;
        }
        user.setActivationCode(null);
        userRepository.save(user);
    }

    public void addUser(User user) {
        if (isUserExsists(user)) {
            return;
        }

        encoder(user);
        user.setRole(UserRole.ROLE_READER);
        if(!this.mailService.isNull(user)) {
            String message = String.format(
                    "Hallo, %s \n" +
                            "Welcome to RealTime Paint! Please, visit next link: http://localhost:8080/auth/activate/%s",
                    user.getUsername(),
                    user.getActivationCode()
            );

            this.mailService.send(user.getEmail(), "Activation code", message);
        }
        this.userRepository.save(user);
    }

    private Boolean isUserExsists(User user) {
        return this.userRepository.findByUsername(user.getUsername()) != null;
    }

    private Boolean isNull(User user) {
        return this.userRepository.findByUsername(user.getUsername()) == null;
    }


    private void encoder(User user) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        user.setPassword(encoder.encode(user.getPassword()));
        user.setActivationCode(UUID.randomUUID().toString());
    }
}
