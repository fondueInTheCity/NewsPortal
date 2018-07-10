package com.spring.server.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Getter
@Setter
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "name")
    private String name;

    @JsonBackReference(value="news-category")
    @ManyToMany(mappedBy = "categories")
    public Set<News> news;

    public Category(String name) {
        this.name = name;
    }
    public Category() {
    }
}
