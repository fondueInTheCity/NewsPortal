package com.spring.server.service.transformer.RatingDtoTransformer;

import com.spring.server.model.Rating;
import com.spring.server.repository.NewsRepository;
import com.spring.server.repository.UserRepository;
import com.spring.server.service.dto.RatingDto.RatingSetDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RatingSetDtoTransformer {

    private final UserRepository userRepository;
    private final NewsRepository newsRepository;

    public Rating makeModel(RatingSetDto ratingSetDto) {
        Rating rating = new Rating();
        rating.setUser(userRepository.findByUsername(ratingSetDto.getUsername()));
        rating.setNews(newsRepository.findById(ratingSetDto.getIdPost()));
        rating.setValue(ratingSetDto.getRating());
        return rating;
    }
}
