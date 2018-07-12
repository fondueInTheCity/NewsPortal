package com.spring.server.controller;

import com.spring.server.model.Category;
import com.spring.server.service.SectionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RequestMapping(value = "/section", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class SectionController {

    private final SectionService sectionService;

    @GetMapping("/getAllCategories")
    @ResponseStatus(HttpStatus.OK)
    public List<Category> getAllCategories() {
        return this.sectionService.getAllCategories();
    }
}
