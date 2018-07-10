package com.spring.server.service.transformer.NewsTransformer;

import com.spring.server.model.News;
import com.spring.server.repository.UserRepository;
import com.spring.server.service.dto.NewsDto.NewsInfoDto;
import com.spring.server.service.dto.NewsDto.PostInfoDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class NewsAddDtoTransformer {

    private final UserRepository userRepository;

    public News makeModel(NewsInfoDto newsAddDto) {
        News news = new News();
        news.setId(newsAddDto.getPost().getId());
        news.setName(newsAddDto.getPost().getName());
        news.setDescription(newsAddDto.getPost().getDescription());
        news.setText(newsAddDto.getPost().getText());
        news.setPublishDate(newsAddDto.getPost().getPublishDate());
        news.setUser(this.userRepository.findById(newsAddDto.getPost().getId_user()));
        news.setTags(newsAddDto.getTags());
        news.setCategories(newsAddDto.getCategories());
        return news;
    }

    public NewsInfoDto makeDto(News news) {
        NewsInfoDto newsAddDto = new NewsInfoDto();
        PostInfoDto postInfo = new PostInfoDto();
        postInfo.setId(news.getId());
        postInfo.setName(news.getName());
        postInfo.setDescription(news.getDescription());
        postInfo.setText(news.getText());
        postInfo.setPublishDate(news.getPublishDate());
        postInfo.setId_user(news.getUser().getId());
        postInfo.setAuthorName(news.getUser().getUsername());
        newsAddDto.setPost(postInfo);
        newsAddDto.setTags(news.getTags());
        newsAddDto.setCategories(news.getCategories());
        return newsAddDto;
    }

    public List<NewsInfoDto> makeListDto(List<News> newsList) {
        List<NewsInfoDto> newsAddDtoList = new ArrayList<>();
        for(News news : newsList) {
            newsAddDtoList.add(makeDto(news));
        }
        return newsAddDtoList;
    }

    public List<News> makeListModel(List<NewsInfoDto> newsAddDtoList) {
        List<News> newsList = new ArrayList();
        for(NewsInfoDto newsAddDto : newsAddDtoList) {
            newsList.add(makeModel(newsAddDto));
        }
        return newsList;
    }
}
