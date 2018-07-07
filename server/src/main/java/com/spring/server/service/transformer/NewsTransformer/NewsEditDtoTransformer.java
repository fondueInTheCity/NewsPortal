package com.spring.server.service.transformer.NewsTransformer;

import com.spring.server.model.News;
import com.spring.server.repository.NewsRepository;
import com.spring.server.service.dto.NewsDto.NewsEditDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class NewsEditDtoTransformer {

    private final NewsRepository newsRepository;

    public News makeModel(NewsEditDto newsEditDto) {
        News post = newsRepository.findById(newsEditDto.getId());
        post.setName(newsEditDto.getName());
        post.setDescription(newsEditDto.getDescription());
        post.setText(newsEditDto.getText());
        return post;
    }
}
