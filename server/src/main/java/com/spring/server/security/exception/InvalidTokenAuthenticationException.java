package com.spring.server.security.exception;

import org.springframework.security.core.AuthenticationException;

public class InvalidTokenAuthenticationException extends AuthenticationException {

    public InvalidTokenAuthenticationException(final String msg, final Throwable throwable) {
        super(msg, throwable);
    }

    public InvalidTokenAuthenticationException(final String msg) {
        super(msg);
    }

}
