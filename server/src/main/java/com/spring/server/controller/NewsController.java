package com.spring.server.controller;

import com.spring.server.service.NewsService;
import com.spring.server.service.StorageService;
import com.spring.server.service.dto.CommentDto.CommentAddDto;
import com.spring.server.service.dto.CommentDto.CommentShowDto;
import com.spring.server.service.dto.LikeDto.LikeDto;
import com.spring.server.service.dto.NewsDto.NewsInfoDto;
import com.spring.server.service.dto.RatingDto.RatingSetDto;
import lombok.RequiredArgsConstructor;
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
    public List<NewsInfoDto> getNews() {
        return this.newsService.getNews();
    }

    @GetMapping("/allNews/{username}")
    public Set<NewsInfoDto> getNewsByIdUser(@PathVariable String username) {
        return this.newsService.getNewsByIdUsername(username);
    }

    @PostMapping("/addPost")
    public void addPost(@RequestBody NewsInfoDto post) {
        this.newsService.addPost(post);
    }

    @GetMapping("/author/{idUser}")
    public List<NewsInfoDto> getNewsByIdUser(@PathVariable Long idUser) {
        return this.newsService.getNewsByIdUser(idUser);
    }

    @GetMapping("/{idPost}")
    public NewsInfoDto getPostById(@PathVariable Long idPost) {
        return this.newsService.getPostById(idPost);
    }

    @PostMapping("/addImageToPost")
    public String addImageToPost(@RequestParam("file") MultipartFile image) {
        return this.storageService.uploadImage(image);
    }

    @PostMapping("/edit")
    public void editPost(@RequestBody NewsInfoDto newsInfoDto) {
        this.newsService.editPost(newsInfoDto);
    }

    @DeleteMapping("/deletePost/{idPost}")
    public void deletePost(@PathVariable Long idPost) {
        this.newsService.deletePost(idPost);
    }

    @PostMapping("/addComment")
    public void addComment(@RequestBody CommentAddDto commentAddDto) {
        this.newsService.addComment(commentAddDto);
    }

    @GetMapping("/comments/{idPost}")
    public Set<CommentShowDto> getPostComments(@PathVariable long idPost) {
        return this.newsService.getPostComments(idPost);
    }

    @PostMapping("/addLike")
    public void addLike(@RequestBody LikeDto likeDto) {
        this.newsService.addLike(likeDto);
    }

    @PostMapping("/setPostRating")
    public float setPostRating(@RequestBody RatingSetDto ratingSetDto) {
        return this.newsService.setPostRating(ratingSetDto);
    }

    @GetMapping("/getPostRating/{idPost}")
    public float getPostRating(@PathVariable long idPost) {
        return this.newsService.getPostRating(idPost);
    }

}
