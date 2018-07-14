package com.spring.server.service.dto.NewsDto;

import com.spring.server.model.Comment;
import com.spring.server.service.dto.Dto;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class NewsWithCommentsDto implements Dto {
    private NewsInfoDto post;
    private Set<Comment> comments;
}
