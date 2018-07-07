package com.spring.server.service.dto.NewsDto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NewsEditDto {
    private long id;
    private String name;
    private String description;
    private String text;
}
