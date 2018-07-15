package com.spring.server.service.transformer.NewsTransformer;

import com.spring.server.model.News;
import com.spring.server.model.User;
import com.spring.server.repository.UserRepository;
import com.spring.server.service.dto.NewsDto.NewsInfoDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class NewsInfoDtoTransformer {

    private final UserRepository userRepository;
    private final PostInfoDtoTransformer postInfoDtoTransformer;

    public News makeModel(NewsInfoDto newsInfoDto) {
        News news = new News();
        news.setId(newsInfoDto.getPost().getId());
        news.setName(newsInfoDto.getPost().getName());
        news.setDescription(newsInfoDto.getPost().getDescription());
        news.setText(newsInfoDto.getPost().getText());
        news.setPublishDate(newsInfoDto.getPost().getPublishDate());
        User user = this.userRepository.findById(newsInfoDto.getPost().getId_user());
        news.setUserImage(user.getAvatar());
        news.setUser(user);
        news.setRatingValue(newsInfoDto.getPost().getValue_rating());
        return news;
    }

    public NewsInfoDto makeDto(News news) {
        NewsInfoDto newsInfoDto = new NewsInfoDto();
        newsInfoDto.setPost(postInfoDtoTransformer.makeDto(news));
        newsInfoDto.setTags(news.getTags());
        newsInfoDto.setCategories(news.getCategories());
        return newsInfoDto;
    }

    public Set<NewsInfoDto> makeSetDto(Set<News> newsSet) {
        Set<NewsInfoDto> newsInfoDtoSet = new HashSet<>();
        for(News news : newsSet) {
            newsInfoDtoSet.add(makeDto(news));
        }
        return newsInfoDtoSet;
    }

    public List<NewsInfoDto> makeListDto(List<News> newsList) {
        List<NewsInfoDto> newsInfoDtoList = new ArrayList<>();
        for(News news : newsList) {
            newsInfoDtoList.add(makeDto(news));
        }
        return newsInfoDtoList;
    }
}
