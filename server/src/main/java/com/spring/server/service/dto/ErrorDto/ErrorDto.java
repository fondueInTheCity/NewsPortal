package com.spring.server.service.dto.ErrorDto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ErrorDto {
    private String error;
    private String message;

    public ErrorDto(String error, String message) {
        this.error = error;
        this.message = message;
    }
}
