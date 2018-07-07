package com.spring.server.service.dto.NewsDto;

import com.spring.server.service.dto.Dto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NewsAddDto implements Dto {
    private Long id;
    private String name;
    private String description;
    private String text;
    private String publishDate;
    private long id_user;
    private String authorName;
}
