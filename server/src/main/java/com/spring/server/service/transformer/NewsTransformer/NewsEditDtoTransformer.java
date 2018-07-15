package com.spring.server.service.transformer.NewsTransformer;

import com.spring.server.model.News;
import com.spring.server.repository.NewsRepository;
import com.spring.server.service.dto.NewsDto.NewsInfoDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class NewsEditDtoTransformer {

    private final NewsRepository newsRepository;

    public News makeEditModel(NewsInfoDto newsInfoDto) {
        News post = newsRepository.findById((long)newsInfoDto.getPost().getId());
        post.setName(newsInfoDto.getPost().getName());
        post.setDescription(newsInfoDto.getPost().getDescription());
        post.setText(newsInfoDto.getPost().getText());
        post.setCategories(newsInfoDto.getCategories());
        return post;
    }
}
