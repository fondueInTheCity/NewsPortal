package com.spring.server.service;

import com.spring.server.model.News;
import com.spring.server.repository.NewsRepository;
import com.spring.server.repository.UserRepository;
import com.spring.server.service.dto.NewsDto;
import com.spring.server.service.transformer.NewsDtoTransformer;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NewsService {

    private final NewsRepository newsRepository;
    private final UserRepository userRepository;
    private final NewsDtoTransformer newsDtoTransformer;

    public List<NewsDto> getAll() {
        return newsDtoTransformer.makeListDto(newsRepository.findAll());
    }

    public void addPost( News news) {
        news.setPublishDate(LocalDateTime.now().toString());
        this.newsRepository.save(news);
    }

    public List<NewsDto> getAllById(long id) {
        return  newsDtoTransformer.makeListDto(newsRepository.findAllByUser(userRepository.findById(id)));
    }

    public NewsDto getById(long id) {
        return newsDtoTransformer.makeDto(newsRepository.findById(id));
    }
}
