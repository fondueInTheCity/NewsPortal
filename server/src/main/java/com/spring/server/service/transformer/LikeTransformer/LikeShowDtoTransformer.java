package com.spring.server.service.transformer.LikeTransformer;

import com.spring.server.model.Like;
import com.spring.server.service.dto.LikeDto.LikeShowDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
@RequiredArgsConstructor
public class LikeShowDtoTransformer {

    public LikeShowDto makeDto(Set<Like> likes) {
        LikeShowDto likeShowDto = new LikeShowDto();
        likeShowDto.setAmountOfLikes(likes.size());
        return likeShowDto;
    }
}
