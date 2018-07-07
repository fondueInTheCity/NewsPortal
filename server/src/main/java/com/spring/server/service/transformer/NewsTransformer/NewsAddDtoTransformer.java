package com.spring.server.service.transformer.NewsTransformer;

import com.spring.server.model.News;
import com.spring.server.repository.UserRepository;
import com.spring.server.service.dto.NewsDto.NewsAddDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class NewsAddDtoTransformer {

    private final UserRepository userRepository;

    public News makeModel(NewsAddDto newsAddDto) {
        News news = new News();
        news.setId(newsAddDto.getId());
        news.setName(newsAddDto.getName());
        news.setDescription(newsAddDto.getDescription());
        news.setText(newsAddDto.getText());
        news.setPublishDate(newsAddDto.getPublishDate());
        news.setUser(this.userRepository.findById(newsAddDto.getId_user()));
        return news;
    }

    public NewsAddDto makeDto(News news) {
        NewsAddDto newsAddDto = new NewsAddDto();
        newsAddDto.setId(news.getId());
        newsAddDto.setName(news.getName());
        newsAddDto.setDescription(news.getDescription());
        newsAddDto.setText(news.getText());
        newsAddDto.setPublishDate(news.getPublishDate());
        newsAddDto.setId_user(news.getUser().getId());
        newsAddDto.setAuthorName(news.getUser().getUsername());
        return newsAddDto;
    }

    public List<NewsAddDto> makeListDto(List<News> newsList) {
        List<NewsAddDto> newsAddDtoList = new ArrayList<>();
        for(News news : newsList) {
            newsAddDtoList.add(makeDto(news));
        }
        return newsAddDtoList;
    }

    public List<News> makeListModel(List<NewsAddDto> newsAddDtoList) {
        List<News> newsList = new ArrayList();
        for(NewsAddDto newsAddDto : newsAddDtoList) {
            newsList.add(makeModel(newsAddDto));
        }
        return newsList;
    }
}
