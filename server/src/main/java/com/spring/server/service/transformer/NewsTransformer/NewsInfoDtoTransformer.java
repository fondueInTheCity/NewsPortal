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
public class NewsInfoDtoTransformer {

    private final UserRepository userRepository;

    public News makeModel(NewsInfoDto newsInfoDto) {
        News news = new News();
        news.setId(newsInfoDto.getPost().getId());
        news.setName(newsInfoDto.getPost().getName());
        news.setDescription(newsInfoDto.getPost().getDescription());
        news.setText(newsInfoDto.getPost().getText());
        news.setPublishDate(newsInfoDto.getPost().getPublishDate());
        news.setUser(this.userRepository.findById(newsInfoDto.getPost().getId_user()));
        news.setRatingValue(newsInfoDto.getPost().getValue_rating());
//        news.setTags(newsInfoDto.getTags());
//        news.setCategories(newsInfoDto.getCategories());
        return news;
    }



    public NewsInfoDto makeDto(News news) {
        NewsInfoDto newsInfoDto = new NewsInfoDto();
        PostInfoDto postInfo = new PostInfoDto();
        postInfo.setId(news.getId());
        postInfo.setName(news.getName());
        postInfo.setDescription(news.getDescription());
        postInfo.setText(news.getText());
        postInfo.setPublishDate(news.getPublishDate());
        postInfo.setId_user(news.getUser().getId());
        postInfo.setAuthorName(news.getUser().getUsername());
        postInfo.setValue_rating(news.getRatingValue());
        newsInfoDto.setPost(postInfo);
        newsInfoDto.setTags(news.getTags());
//        for(Rating rating : news.getRating()) {
//            newsInfoDto.getPost().getIdUsers().add(rating.getUser().getId());
//        }
        newsInfoDto.setCategories(news.getCategories());
        return newsInfoDto;
    }

    public List<NewsInfoDto> makeListDto(List<News> newsList) {
        List<NewsInfoDto> newsInfoDtoList = new ArrayList<>();
        for(News news : newsList) {
            newsInfoDtoList.add(makeDto(news));
        }
        return newsInfoDtoList;
    }

    public List<News> makeListModel(List<NewsInfoDto> newsInfoDtoList) {
        List<News> newsList = new ArrayList<>();
        for(NewsInfoDto newsInfoDto : newsInfoDtoList) {
            newsList.add(makeModel(newsInfoDto));
        }
        return newsList;
    }
}
