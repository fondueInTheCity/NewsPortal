package com.spring.server.service.dto.LikeDto;

import com.spring.server.service.dto.Dto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LikeShowDto implements Dto {

    private long amountOfLikes;
    private Boolean state;
}
