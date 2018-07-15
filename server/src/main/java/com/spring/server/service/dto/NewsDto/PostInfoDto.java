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
    private String userImage;
    private long id_user;
    private float value_rating;
    private String authorName;
}
