package com.spring.server.service.transformer.CommentTransformer;

import com.spring.server.model.Comment;
import com.spring.server.repository.NewsRepository;
import com.spring.server.repository.UserRepository;
import com.spring.server.service.dto.CommentDto.CommentAddDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class CommentAddDtoTransformer {

    private final UserRepository userRepository;
    private final NewsRepository newsRepository;

    public Comment makeModel(CommentAddDto commentAddDto) {
        Comment comment = new Comment();
        comment.setText(commentAddDto.getText());
        comment.setUser(this.userRepository.findByUsername(commentAddDto.getUsername()));
        comment.setNews(this.newsRepository.findById(commentAddDto.getId_news()));
        comment.setPublish_date(LocalDateTime.now().toString());
        return comment;
    }

}
