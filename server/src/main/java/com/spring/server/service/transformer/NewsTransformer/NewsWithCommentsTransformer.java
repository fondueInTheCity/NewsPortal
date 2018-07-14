package com.spring.server.service.transformer.NewsTransformer;

import com.spring.server.model.News;
import com.spring.server.service.dto.NewsDto.NewsInfoDto;
import com.spring.server.service.dto.NewsDto.NewsWithCommentsDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class NewsWithCommentsTransformer {

    private final NewsInfoDtoTransformer newsInfoDtoTransformer;

    public Set<NewsWithCommentsDto> makeDto(List<News> news) {
        Set<NewsWithCommentsDto> newsWithCommentsDto = new HashSet<>();
        for (News post: news) {
            NewsInfoDto postDto = newsInfoDtoTransformer.makeDto(post);
            NewsWithCommentsDto postWithComments = new NewsWithCommentsDto();
            postWithComments.setPost(postDto);
            postWithComments.setComments(post.getComments());
            newsWithCommentsDto.add(postWithComments);
        }
        return newsWithCommentsDto;
    }
}
