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
public class LikeDto implements Dto {
    private long id;
    private long id_user;
    private long id_comment;
}
