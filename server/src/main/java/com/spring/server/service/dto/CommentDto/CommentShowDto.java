package com.spring.server.service.dto.CommentDto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentShowDto {
    private long id;
    private String text;
    private long id_user;
    private String author_name;
}
