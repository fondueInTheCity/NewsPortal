package com.spring.server.service.dto.NewsDto;

import lombok.Getter;
import lombok.Setter;

/**
 * Created by Юрий on 10.07.2018.
 */
@Getter
@Setter
public class PostInfoEditDto {
    private long id;
    private String name;
    private String description;
    private String text;
}
