package com.spring.server.service.transformer.CommentTransformer;

import com.spring.server.model.Comment;
import com.spring.server.service.dto.CommentDto.CommentShowDto;
import com.spring.server.service.transformer.LikeTransformer.LikeDtoTransformer;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class CommentShowTransformer {

    private final LikeDtoTransformer likeDtoTransformer;

    public CommentShowDto makeDto(Comment comment) {
        CommentShowDto commentShowDto = new CommentShowDto();
        commentShowDto.setId(comment.getId());
        commentShowDto.setText(comment.getText());
        commentShowDto.setAuthor_name(comment.getUser().getUsername());
        commentShowDto.setLikes(likeDtoTransformer.makeSetLikeDto(comment.getLikes()));
        commentShowDto.setPublish_date(comment.getPublish_date());
        commentShowDto.setCurrent_likes_user(comment.getUser().getAmountLike());
        commentShowDto.setAvatar(comment.getUser().getAvatar());
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
