package com.spring.server.controller;

import com.dropbox.core.DbxException;
import com.spring.server.service.NewsService;
import com.spring.server.service.StorageService;
import com.spring.server.service.dto.CommentDto.CommentAddDto;
import com.spring.server.service.dto.CommentDto.CommentShowDto;
import com.spring.server.service.dto.LikeDto.LikeDto;
import com.spring.server.service.dto.NewsDto.NewsInfoDto;
import com.spring.server.service.dto.RatingDto.RatingSetDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Set;

@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RequestMapping(value = "/news", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class NewsController {

    private final NewsService newsService;
    private final StorageService storageService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<NewsInfoDto> getNews(
    ) {
        return this.newsService.getNews();
    }

    @PostMapping("/addPost")
    @ResponseStatus(HttpStatus.OK)
    public void addPost(@RequestBody NewsInfoDto post) {
        this.newsService.addPost(post);
    }

    @GetMapping("/author/{idUser}")
    @ResponseStatus(HttpStatus.OK)
    public List<NewsInfoDto> getNewsByIdUser(@PathVariable Long idUser) {
        return this.newsService.getNewsByIdUser(idUser);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public NewsInfoDto getPostById(@PathVariable Long id) {
        return this.newsService.getPostById(id);
    }

    @PostMapping("/addImageToPost")
    @ResponseStatus(HttpStatus.OK)
    public String addImageToPost(@RequestParam("file") MultipartFile image) throws DbxException {
        return this.storageService.uploadImage(image);
    }

    @PostMapping("/edit")
    @ResponseStatus(HttpStatus.OK)
    public void editPost(@RequestBody NewsInfoDto newsInfoDto) {
        this.newsService.editPost(newsInfoDto);
    }

    @DeleteMapping("/deletePost/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deletePost(@PathVariable Long id) {
        this.newsService.deletePost(id);
    }

    @PostMapping("/comment")
    @ResponseStatus(HttpStatus.OK)
    public void addComment(@RequestBody CommentAddDto commentAddDto) {
        this.newsService.addComment(commentAddDto);
    }

    @GetMapping("/comments/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Set<CommentShowDto> showComments(@PathVariable long id) {
        return this.newsService.showComments(id);
    }

    @PostMapping("/addLike")
    @ResponseStatus(HttpStatus.OK)
    public void addLike(@RequestBody LikeDto likeDto) {
        this.newsService.addLike(likeDto);
    }

    @PostMapping("/setPostRating")
    @ResponseStatus(HttpStatus.OK)
    public float getPostRating(@RequestBody RatingSetDto ratingSetDto) {
        return this.newsService.setPostRating(ratingSetDto);
    }

    @GetMapping("/getPostRating/{id}")
    @ResponseStatus(HttpStatus.OK)
    public float getPostRating(@PathVariable long id) {
        return this.newsService.getPostRating(id);
    }
}
