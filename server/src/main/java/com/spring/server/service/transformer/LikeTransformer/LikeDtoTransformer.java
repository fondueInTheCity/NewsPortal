package com.spring.server.service.transformer.LikeTransformer;

import com.spring.server.model.Like;
import com.spring.server.repository.CommentRepository;
import com.spring.server.repository.UserRepository;
import com.spring.server.service.dto.LikeDto.LikeDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class LikeDtoTransformer {

    private final UserRepository userRepository;
    private final CommentRepository commentRepository;

    public Like makeModel(LikeDto likeDto) {
        Like like = new Like();
        like.setId(likeDto.getId());
        like.setUser(this.userRepository.findByUsername(likeDto.getUsername()));
        like.setComment(this.commentRepository.findById(likeDto.getId_comment()));
        return like;
    }
}
