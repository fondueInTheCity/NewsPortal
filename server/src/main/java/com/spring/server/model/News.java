package com.spring.server.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Getter
@Setter
public class News {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "text")
    private String text;

    @Column(name = "ratingValue")
    private Float ratingValue;

    @Column(name = "publishDate")
    private String publishDate;

    @JsonBackReference(value="news-tag")
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "news_tag", joinColumns = @JoinColumn(name = "id_news", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "id_tag", referencedColumnName = "id"))
    public Set<Tag> tags;

    @JsonBackReference(value="news-category")
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "news_category", joinColumns = @JoinColumn(name = "id_news", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "id_category", referencedColumnName = "id"))
    public Set<Category> categories;

    @ManyToOne
    @JoinColumn(name = "id_user")
    private User user;

    @OneToMany(mappedBy = "news", cascade = CascadeType.ALL)
    private Set<Comment> comments;

    @OneToMany(mappedBy = "news", cascade = CascadeType.ALL)
    private Set<Rating> rating;

    public News(String name, String description, String text) {
        this.name = name;
        this.description = description;
        this.text = text;
        this.publishDate = LocalDateTime.now().toString();
    }

    public News() {
    }

    @Override
    public String toString() {
        return "News{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", text='" + text + '\'' +
                ", publishDate='" + publishDate + '\'' +
                '}';
    }
}
