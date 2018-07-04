package com.spring.server.service.transformer;

import com.spring.server.model.News;
import com.spring.server.repository.UserRepository;
import com.spring.server.service.dto.NewsDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class NewsDtoTransformer {

    private final UserRepository userRepository;

    public News makeModel(NewsDto newsDto) {
        News news = new News();
        news.setId(newsDto.getId());
        news.setName(newsDto.getName());
        news.setDescription(newsDto.getDescription());
        news.setText(newsDto.getText());
        news.setPublishDate(newsDto.getPublishDate());
        news.setUser(this.userRepository.findById(newsDto.getId_user()));
        return news;
    }

    public NewsDto makeDto(News news) {
        NewsDto newsDto = new NewsDto();
        newsDto.setId(news.getId());
        newsDto.setName(news.getName());
        newsDto.setDescription(news.getDescription());
        newsDto.setText(news.getText());
        newsDto.setPublishDate(news.getPublishDate());
        newsDto.setId_user(news.getUser().getId());
        return newsDto;
    }

    public List<NewsDto> makeListDto(List<News> newsList) {
        List<NewsDto> newsDtoList = new ArrayList();
        for(News news : newsList) {
            newsDtoList.add(makeDto(news));
        }
        return newsDtoList;
    }

    public List<News> makeListModel(List<NewsDto> newsDtoList) {
        List<News> newsList = new ArrayList();
        for(NewsDto newsDto : newsDtoList) {
            newsList.add(makeModel(newsDto));
        }
        return newsList;
    }
}
