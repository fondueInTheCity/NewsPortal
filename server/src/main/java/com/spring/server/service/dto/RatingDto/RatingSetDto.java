package com.spring.server.service.dto.RatingDto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RatingSetDto {

    private String username;
    private long idPost;
    private int rating;
}
