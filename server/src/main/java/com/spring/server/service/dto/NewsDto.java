package com.spring.server.service.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NewsDto implements Dto{
    private Long id;
    private String name;
    private String description;
    private String text;
    private String publishDate;
    private long id_user;
}
