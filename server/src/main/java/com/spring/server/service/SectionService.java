package com.spring.server.service;

import com.spring.server.model.Category;
import com.spring.server.model.Tag;
import com.spring.server.repository.CategoryRepository;
import com.spring.server.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class SectionService {

    private final CategoryRepository categoryRepository;
    private final TagRepository tagRepository;

    public List<Category> getAllCategories() {
        return this.categoryRepository.findAll();
    }

    public List<Tag> getAllTags() {
        return this.tagRepository.findAll();
    }

    public Set<Tag> mergeTagsToDb(Set<Tag> tags) {
        Set<Tag> resultTags = new HashSet<>();
        for (Tag tag: tags) {
            Boolean isTagExists = this.tagRepository.existsByName(tag.getName());
            if (isTagExists) {
                Tag existedTag = this.tagRepository.findByName(tag.getName());
                resultTags.add(existedTag);
            }
            else {
                resultTags.add(this.tagRepository.save(tag));
            }
        }
        return resultTags;
    }

    public Set<Category> getMergedCategories(Set<Category> categories) {
        Set<Category> resultCategories = new HashSet<>();
        for (Category category: categories) {
            Category dbCategory = this.categoryRepository.findById((long)category.getId());
            resultCategories.add(dbCategory);
        }
        return resultCategories;
    }


}
