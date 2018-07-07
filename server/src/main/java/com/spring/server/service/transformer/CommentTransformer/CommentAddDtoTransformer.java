package com.spring.server.service.transformer.CommentTransformer;

import com.spring.server.model.Comment;
import com.spring.server.repository.NewsRepository;
import com.spring.server.repository.UserRepository;
import com.spring.server.service.dto.CommentDto.CommentAddDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CommentAddDtoTransformer {

    private final UserRepository userRepository;
    private final NewsRepository newsRepository;

    public Comment makeModel(CommentAddDto commentAddDto) {
        Comment comment = new Comment();
        comment.setText(commentAddDto.getText());
        comment.setUser(this.userRepository.findById(commentAddDto.getId_user()));
        comment.setNews(this.newsRepository.findById(commentAddDto.getId_news()));
        return comment;
    }


}
