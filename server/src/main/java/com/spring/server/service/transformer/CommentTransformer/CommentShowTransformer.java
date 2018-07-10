package com.spring.server.service.transformer.CommentTransformer;

import com.spring.server.model.Comment;
import com.spring.server.service.dto.CommentDto.CommentShowDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class CommentShowTransformer {

    public CommentShowDto makeDto(Comment comment) {
        CommentShowDto commentShowDto = new CommentShowDto();
        commentShowDto.setId(comment.getId());
        commentShowDto.setText(comment.getText());
        commentShowDto.setAuthor_name(comment.getUser().getUsername());
        commentShowDto.setLikes(comment.getLikes());
        commentShowDto.setPublish_date(comment.getPublish_date());
        return commentShowDto;
    }

    public Set<CommentShowDto> makeSetDto(Set<Comment> comments) {
        Set<CommentShowDto> commentsShowDto = new HashSet<>();
        for(Comment comment : comments) {
            commentsShowDto.add(makeDto(comment));
        }
        return commentsShowDto;
    }
}
