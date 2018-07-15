package com.spring.server.service;

import com.spring.server.constants.Abbreviation;
import com.spring.server.model.User;
import com.spring.server.repository.UserRepository;
import com.spring.server.security.model.JwtUserDetails;
import com.spring.server.security.service.AuthenticationHelper;
import com.spring.server.service.dto.ErrorDto.ErrorDto;
import com.spring.server.service.dto.JsonException;
import com.spring.server.service.dto.LoginDto.LoginRequestDto;
import com.spring.server.service.dto.LoginDto.LoginResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserService userService;
    private final AuthenticationHelper authenticationHelper;
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;

    public LoginResponseDto login(final LoginRequestDto loginRequestDto) {
        try {
            String username = Optional.ofNullable(loginRequestDto.getUsername())
                    .orElseThrow(() -> new BadCredentialsException("Username should be passed."));
            String password = Optional.ofNullable(loginRequestDto.getPassword())
                    .orElseThrow(() -> new BadCredentialsException("Password should be passed."));
            UsernamePasswordAuthenticationToken authRequest = new UsernamePasswordAuthenticationToken(username,
                    password);
            if(userService.uniqueUsername(username)) {
                return new LoginResponseDto(null, new ErrorDto(Abbreviation.ERROR, Abbreviation.ERROR_UNIQUE_USERNAME),
                        null);
            }
            if (this.userService.userIsDeleted(loginRequestDto.getUsername())) {
                return new LoginResponseDto(null, new ErrorDto(Abbreviation.ERROR, Abbreviation.ERROR_USER_DELETED),
                        null);
            }
            if (!this.userService.userIsActive(loginRequestDto.getUsername())) {
                return new LoginResponseDto(null, new ErrorDto(Abbreviation.ERROR, Abbreviation.ERROR_USER_ISNT_ACTIVE),
                        null);
            }
            if (this.userService.userIsBlocked(loginRequestDto.getUsername())) {
                return new LoginResponseDto(null, new ErrorDto(Abbreviation.ERROR, Abbreviation.ERROR_USER_BLOCKED),
                        null);
            }
            final Authentication authResult = this.authenticationManager.authenticate(authRequest);
            if (authResult.isAuthenticated()) {
                JwtUserDetails userDetails = (JwtUserDetails) authResult.getPrincipal();
                User user = userRepository.findById((long)userDetails.getId());
                String token = this.authenticationHelper.generateToken(userDetails.getId());
                return new LoginResponseDto(token,
                                            new ErrorDto(Abbreviation.SUCCESS, Abbreviation.SUCCESS_AUTHENTICATION),
                                            user);
            } else {
                throw new JsonException("Authentication failed.");
            }
        } catch (BadCredentialsException exception) {
            return new LoginResponseDto(null, new ErrorDto(Abbreviation.ERROR, Abbreviation.ERROR_INVALID_PARAMETRS),
                    null);
        }
    }
}
