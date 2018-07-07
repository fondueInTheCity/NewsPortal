package com.spring.server.controller;

import com.spring.server.service.NewsService;
import com.spring.server.service.dto.CommentDto.CommentAddDto;
import com.spring.server.service.dto.CommentDto.CommentShowDto;
import com.spring.server.service.dto.NewsDto.NewsAddDto;
import com.spring.server.service.dto.NewsDto.NewsEditDto;
import com.spring.server.service.transformer.NewsTransformer.NewsAddDtoTransformer;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RequestMapping(value = "/news", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class NewsController {

    private final NewsService newsService;
    private final NewsAddDtoTransformer newsAddDtoTransformer;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<NewsAddDto> getNews(
    ) {
        return this.newsService.getNews();
    }

    @PostMapping("/addPost")
    @ResponseStatus(HttpStatus.OK)
    public void addPost(@RequestBody NewsAddDto post) {
        this.newsService.addPost(post);
    }

    @GetMapping("/author/{idUser}")
    @ResponseStatus(HttpStatus.OK)
    public List<NewsAddDto> getNewsByIdUser(@PathVariable Long idUser) {
        return this.newsService.getNewsByIdUser(idUser);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public NewsAddDto getPostById(@PathVariable Long id) {
        return this.newsService.getPostById(id);
    }

    @PostMapping("/edit")
    @ResponseStatus(HttpStatus.OK)
    public void editPost(@RequestBody NewsEditDto newsEditDto) {
        this.newsService.editPost(newsEditDto);
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
    public List<CommentShowDto> showComments(@PathVariable long id) {
        return this.newsService.showComments(id);
    }
}
