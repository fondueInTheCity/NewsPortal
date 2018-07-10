package com.spring.server.service.dto.NewsDto;

import lombok.Getter;
import lombok.Setter;

/**
 * Created by Юрий on 10.07.2018.
 */
@Getter
@Setter
public class PostInfoDto {
    private Long id;
    private String name;
    private String description;
    private String text;
    private String publishDate;
    private long id_user;
    private String authorName;
}
