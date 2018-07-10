package com.spring.server.service.dto.CommentDto;

import com.spring.server.model.Like;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class CommentShowDto {
    private long id;
    private String text;
    private String author_name;
    private String publish_date;
    private Set<Like> likes;
}
