package com.spring.server.service;

import com.dropbox.core.DbxException;
import com.spring.server.model.*;
import com.spring.server.repository.LanguageRepository;
import com.spring.server.repository.ThemeRepository;
import com.spring.server.repository.UserRepository;
import com.spring.server.service.dto.ErrorDto.ErrorDto;
import com.spring.server.service.dto.UserDto.UserAddDto;
import com.spring.server.service.dto.UserDto.UserEditDto;
import com.spring.server.service.dto.UserDto.UserListDto;
import com.spring.server.service.transformer.UserTransformer.UserAddTransformer;
import com.spring.server.service.transformer.UserTransformer.UserEditTransformer;
import com.spring.server.service.transformer.UserTransformer.UserListTransformer;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    private final MailService mailService;
    private final StorageService storageService;
    private final MessageService messageService;
    private final UserRepository userRepository;
    private final ThemeRepository themeRepository;
    private final LanguageRepository languageRepository;
    private final UserListTransformer userListTransformer;
    private final UserEditTransformer userEditTransformer;
    private final UserAddTransformer userAddTransformer;

    @Transactional(readOnly = true)
    public List<UserListDto> findAll() {
//        List<User> users = userRepository.getNews();
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

    public List<Theme> getThemes() {
        List<Theme> themes = themeRepository.findAll();
        return themes;
    }

    public List<Language> getLanguages() {
        List<Language> languages = languageRepository.findAll();
        return languages;
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

    public void setLanguage(String username, Language language) {
        User user = userRepository.findByUsername(username);
        user.setLanguage(language);
        userRepository.save(user);
    }

    public void setTheme(String username, Theme theme) {
        User user = userRepository.findByUsername(username);
        user.setTheme(theme);
        userRepository.save(user);
    }

    public void setRole(long userId, String role) {
        User user = userRepository.findById(userId);
        user.setRole(UserRole.valueOf(role));
        userRepository.save(user);
    }

    public void setUsersImage(Long userId, MultipartFile image) throws DbxException {
        String publicUrl = this.storageService.uploadImage(image);
        User user = this.userRepository.findById((long)userId);
        user.setAvatar(publicUrl);
        userRepository.save(user);
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

    public ErrorDto addUser(UserAddDto userAddDto) {
        User user = userAddTransformer.makeModel(userAddDto);
        if (!this.uniqueUsername(user.getUsername())) {
            return new ErrorDto(Abbreviation.ERROR, Abbreviation.ERROR_ISNT_UNIQUE_USERNAME);
        }
        if (this.isEmailExsists(user.getEmail())) {
            return new ErrorDto(Abbreviation.ERROR, Abbreviation.ERROR_ISNT_UNIQUE_EMAIL);
        }
        setDefaultSettings(user);
        userRepository.save(user);
        mailService.send(user.getEmail(), Abbreviation.SUBJECT_ACTIVATION_CODE,
                messageService.activationCode(user.getUsername(), user.getActivationCode()));

        return new ErrorDto(Abbreviation.SUCCESS, Abbreviation.SUCCESS_REGISTRATION);
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

    private Boolean isEmailExsists(String email) {
        return userRepository.findByEmail(email) != null;
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

    public String getImage(String username) {
        return this.userRepository.findByUsername(username).getAvatar();
    }

    public Boolean uniqueUsername(String username) {
        return userRepository.findByUsername(username) == null;
    }

    private void setDefaultSettings(User user) {
        encoder(user);
        newActivationCode(user);
        user.setAmountLike(0);
        user.setIsActive(false);
        user.setBlocked(false);
        user.setDeleted(false);
        user.setLanguage(languageRepository.findById((long)1));
        user.setTheme(themeRepository.findById((long)1));
        user.setRole(UserRole.ROLE_READER);
    }
}
