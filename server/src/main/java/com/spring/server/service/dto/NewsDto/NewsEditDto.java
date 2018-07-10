package com.spring.server.service.dto.NewsDto;

import com.spring.server.model.Category;
import com.spring.server.model.Tag;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class NewsEditDto {
    private PostInfoEditDto post;
    private Set<Tag> tags;
    private Set<Category> categories;
}
