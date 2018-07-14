package com.spring.server.service.transformer.LikeTransformer;

import com.spring.server.model.Like;
import com.spring.server.repository.CommentRepository;
import com.spring.server.repository.UserRepository;
import com.spring.server.service.dto.LikeDto.LikeDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class LikeDtoTransformer {

    private final UserRepository userRepository;
    private final CommentRepository commentRepository;

    public Like makeModel(LikeDto likeDto) {
        Like like = new Like();
        like.setId(likeDto.getId());
        like.setUser(this.userRepository.findById(likeDto.getId_user()));
        like.setComment(this.commentRepository.findById(likeDto.getId_comment()));
        return like;
    }

    public LikeDto makeDto(Like like) {
        LikeDto likeDto = new LikeDto();
        likeDto.setId(like.getId());
        likeDto.setId(like.getComment().getId());
        likeDto.setId_user(like.getUser().getId());
        return likeDto;
    }

    public Set<LikeDto> makeSetLikeDto(Set<Like> likeSet) {
        Set<LikeDto> likeDtoSet = new HashSet<>();
        for(Like like : likeSet) {
            likeDtoSet.add(makeDto(like));
        }
        return likeDtoSet;
    }
}
