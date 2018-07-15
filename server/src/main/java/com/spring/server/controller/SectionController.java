package com.spring.server.controller;

import com.spring.server.model.Category;
import com.spring.server.model.Tag;
import com.spring.server.service.SectionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RequestMapping(value = "/section", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class SectionController {

    private final SectionService sectionService;

    @GetMapping("/getAllCategories")
    public List<Category> getAllCategories() {
        return this.sectionService.getAllCategories();
    }

    @GetMapping("/getAllTags")
    public List<Tag> getAllTags() {
        return this.sectionService.getAllTags();
    }
}
