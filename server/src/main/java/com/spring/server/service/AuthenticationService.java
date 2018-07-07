package com.spring.server.service;

import com.spring.server.model.User;
import com.spring.server.repository.UserRepository;
import com.spring.server.security.model.JwtUserDetails;
import com.spring.server.security.service.AuthenticationHelper;
import com.spring.server.service.dto.JsonException;
import com.spring.server.service.dto.LoginDto.LoginRequestDto;
import com.spring.server.service.dto.LoginDto.LoginResponseDto;
import com.spring.server.service.transformer.UserTransformer.AuthUserTransformer;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final UserService userService;
    private final AuthenticationHelper authenticationHelper;
    private final AuthenticationManager authenticationManager;

    public LoginResponseDto login(final LoginRequestDto loginRequestDto) {

        try {

            if (!this.userService.userIsActive(loginRequestDto.getUsername())) {
                throw new JsonException("User is not active.");
            }

            if (this.userService.userIsBlocked(loginRequestDto.getUsername())) {
                throw new JsonException("User is blocked");
            }

            if (this.userService.userIsDeleted(loginRequestDto.getUsername())) {
                throw new JsonException("User is deleted");
            }

            String username = Optional.ofNullable(loginRequestDto.getUsername())
                    .orElseThrow(() -> new BadCredentialsException("Username should be passed."));

            String password = Optional.ofNullable(loginRequestDto.getPassword())
                    .orElseThrow(() -> new BadCredentialsException("Password should be passed."));

            UsernamePasswordAuthenticationToken authRequest = new UsernamePasswordAuthenticationToken(username,
                    password);

            final Authentication authResult = this.authenticationManager.authenticate(authRequest);

            if (authResult.isAuthenticated()) {
                JwtUserDetails userDetails = (JwtUserDetails) authResult.getPrincipal();

                Optional<User> user = userRepository.findById(userDetails.getId());
                if (Objects.isNull(user)) {
                    throw new JsonException("User not exist in system.");
                }

                String token = this.authenticationHelper.generateToken(userDetails.getId());


                return new LoginResponseDto(token);
            } else {
                throw new JsonException("Authentication failed.");
            }

        } catch (BadCredentialsException exception) {
            throw new JsonException("Username or password was incorrect. Please try again.", exception);
        }
    }
}
