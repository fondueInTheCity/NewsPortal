package com.spring.server.service.transformer.NewsTransformer;

import com.spring.server.model.News;
import com.spring.server.service.dto.NewsDto.PostInfoDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PostInfoDtoTransformer {

    public PostInfoDto makeDto(News news) {
        PostInfoDto postInfo = new PostInfoDto();
        postInfo.setId(news.getId());
        postInfo.setName(news.getName());
        postInfo.setDescription(news.getDescription());
        postInfo.setText(news.getText());
        postInfo.setPublishDate(news.getPublishDate());
        postInfo.setId_user(news.getUser().getId());
        postInfo.setAuthorName(news.getUser().getUsername());
        postInfo.setUserImage(news.getUser().getAvatar());
        postInfo.setValue_rating(news.getRatingValue());
        return postInfo;
    }
}
