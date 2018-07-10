package com.spring.server.service.dto.NewsDto;

import com.spring.server.model.Category;
import com.spring.server.model.Tag;
import com.spring.server.service.dto.Dto;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class NewsInfoDto implements Dto {
    private PostInfoDto post;
    private Set<Tag> tags;
    private Set<Category> categories;
}
