package com.spring.server.security.service;

import com.spring.server.model.User;
import com.spring.server.repository.UserRepository;
import com.spring.server.security.exception.ExpiredTokenAuthenticationException;
import com.spring.server.security.exception.InvalidTokenAuthenticationException;
import com.spring.server.security.model.JwtAuthenticationToken;
import com.spring.server.security.model.JwtUserDetails;
import com.spring.server.security.model.TokenPayload;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Objects;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationProvider implements AuthenticationProvider {

    private static final long MILLIS_IN_SECOND = 1000L;

    private final UserRepository userRepository;
    private final AuthenticationHelper authenticationHelper;

    @Override
    public Authentication authenticate(final Authentication authRequest) {
        String token = StringUtils.trimToNull((String) authRequest.getCredentials());

        TokenPayload tokenPayload = authenticationHelper.decodeToken(token);

        checkIsExpired(tokenPayload.getExp());

        Long userEntityId = tokenPayload.getUserId();
        if (Objects.isNull(userEntityId)) {
            throw new InvalidTokenAuthenticationException("Token does not contain a user id.");
        }

        Optional<User> user = userRepository.findById(userEntityId);
        if (Objects.isNull(user)) {
            throw new InvalidTokenAuthenticationException("Token does not contain existed user id.");
        }

        JwtUserDetails userDetails = new JwtUserDetails(user.get());
        return new JwtAuthenticationToken(userDetails);
    }

    private void checkIsExpired(final Long tokenExpirationTime) {
        if ((System.currentTimeMillis() / MILLIS_IN_SECOND) > tokenExpirationTime) {
            throw new ExpiredTokenAuthenticationException();
        }
    }

    @Override
    public boolean supports(final Class<?> authentication) {
        return JwtAuthenticationToken.class.isAssignableFrom(authentication);
    }
}