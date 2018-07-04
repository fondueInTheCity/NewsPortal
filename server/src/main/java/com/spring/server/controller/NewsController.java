package com.spring.server.controller;

import com.spring.server.service.NewsService;
import com.spring.server.service.dto.NewsDto;
import com.spring.server.service.transformer.NewsDtoTransformer;
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
    private final NewsDtoTransformer newsDtoTransformer;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<NewsDto> getAll(
    ) {
        return this.newsService.getAll();
    }

    @PostMapping("/addPost")
    @ResponseStatus(HttpStatus.OK)
    public void addPost(@RequestBody NewsDto post) {
        this.newsService.addPost(newsDtoTransformer.makeModel(post));
    }

    @GetMapping("/author/{id}")
    @ResponseStatus(HttpStatus.OK)
    public List<NewsDto> getAllById(@PathVariable Long id) {
        return this.newsService.getAllById(id);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public NewsDto getById(@PathVariable Long id) {
        return this.newsService.getById(id);
    }

}
