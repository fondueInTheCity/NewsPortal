package com.spring.server.service;

import com.spring.server.model.Abbreviation;
import com.spring.server.model.User;
import com.spring.server.model.UserRole;
import com.spring.server.repository.UserRepository;
import com.spring.server.service.dto.UserEditDto;
import com.spring.server.service.dto.UserListDto;
import com.spring.server.service.transformer.UserEditTransformer;
import com.spring.server.service.transformer.UserListTransformer;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    private final UserEditTransformer userEditTransformer;
    private final MessageService messageService;

    @Transactional(readOnly = true)
    public List<UserListDto> findAll() {
//        List<User> users = userRepository.findAll();
        List<User> users = userRepository.findAllExisted();
        List<UserListDto> userDtoList = new ArrayList<>();
        for (User user : users) {
            UserListDto dto = userListTransformer.makeDto(user);
            userDtoList.add(dto);
        }
        return userDtoList;
    }

    public UserEditDto findUserByUsername(String username) {
        User user = userRepository.findByUsername(username);
        UserEditDto dto = userEditTransformer.makeDto(user);
        return dto;
    }

    public void deleteUser(Long id) {
        User deletedUser = userRepository.findById((long)id);
        deletedUser.setDeleted(true);
        userRepository.save(deletedUser);
    }

    public void blockUser(Long id, boolean blockStatus) {
        User blockedUser = userRepository.findById((long)id);
        blockedUser.setBlocked(blockStatus);
        userRepository.save(blockedUser);
    }

    public void editUser(UserEditDto user) {
        User oldUser = userRepository.findById((long)user.getId());
        User editedUser = userEditTransformer.mergeUserData(oldUser, user);
        userRepository.save(editedUser);
    }

    public void activateUser(String code) {
        User user = userRepository.findByActivationCode(code);
        if (this.isNull(user)) {
            return;
        }
        user.setIsActive(true);
        user.setActivationCode(null);
        userRepository.save(user);
    }

    public void addUser(User user) {
        if (this.isUserExsists(user)) {
            return;
        }
        encoder(user);
        newActivationCode(user);
        user.setIsActive(false);
        user.setBlocked(false);
        user.setDeleted(false);
        user.setRole(UserRole.ROLE_READER);
        userRepository.save(user);
        if(!mailService.isNull(user)) {
            mailService.send(user.getEmail(), Abbreviation.SUBJECT_ACTIVATION_CODE,
                    messageService.activationCode(user.getUsername(), user.getActivationCode()));
        }
    }

    public boolean isCodeActivated(String username) {
        return userRepository.findByUsername(username).getActivationCode() == null;
    }

    public boolean userIsActive(String username) {
        return userRepository.findByUsername(username).getIsActive();
    }
    public void sendActivateNewPassword(String email) {
        User user = userRepository.findByEmail(email);
        if(this.isNull(user)) {
            return;
        }
        newActivationCode(user);
        mailService.send(user.getEmail(), Abbreviation.SUBJECT_REMEMBER_USERNAME_PASSWORD,
                messageService.activationCodeChangePassword(user.getUsername(), user.getActivationCode()));
    }

    public void newPassword(String code, String password) {
        User user = userRepository.findByActivationCode(code);
        if (this.isNull(user)) {
            return;
        }
        user.setActivationCode(null);
        user.setPassword(password);
        encoder(user);
        userRepository.save(user);
        if (!mailService.isNull(user)) {
            mailService.send(user.getEmail(), Abbreviation.SUBJECT_REMEMBER_PASSWORD,
                    messageService.rememberPassword(user.getUsername(), password));
        }
    }

    public Boolean userIsBlocked(String username) {
        return userRepository.findByUsername(username).isBlocked();
    }

    public Boolean userIsDeleted(String username) {
        return userRepository.findByUsername(username).isDeleted();
    }

    private Boolean isUserExsists(User user) {
        return userRepository.findByUsername(user.getUsername()) != null;
    }

    private Boolean isNull(User user) {
        return userRepository.findByUsername(user.getUsername()) == null;
    }

    private void newActivationCode(User user) {
        user.setActivationCode(UUID.randomUUID().toString());
    }

    private void encoder(User user) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        user.setPassword(encoder.encode(user.getPassword()));
    }



}
