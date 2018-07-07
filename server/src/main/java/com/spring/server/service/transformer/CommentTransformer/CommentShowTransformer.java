package com.spring.server.service.transformer.CommentTransformer;

import com.spring.server.model.Comment;
import com.spring.server.service.dto.CommentDto.CommentShowDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class CommentShowTransformer {

    public CommentShowDto makeDto(Comment comment) {
        CommentShowDto commentShowDto = new CommentShowDto();
        commentShowDto.setId(comment.getId());
        commentShowDto.setText(comment.getText());
        commentShowDto.setId_user(comment.getUser().getId());
        commentShowDto.setAuthor_name(comment.getUser().getUsername());
        return commentShowDto;
    }

    public List<CommentShowDto> makeListDto(List<Comment> comments) {
        List<CommentShowDto> commentsShowDto = new ArrayList<>();
        for(Comment comment : comments) {
            commentsShowDto.add(makeDto(comment));
        }
        return commentsShowDto;
    }
}
