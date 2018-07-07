package com.spring.server.service.dto.CommentDto;

import com.spring.server.service.dto.Dto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentAddDto implements Dto {
    private String text;
    private long id_news;
    private long id_user;
}
