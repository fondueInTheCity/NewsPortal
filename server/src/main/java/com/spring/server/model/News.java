package com.spring.server.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Set;

@Entity
@Getter
@Setter
public class News {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @Size(min=4, max=50)
    @Column(name = "name")
    private String name;

    @Size(min=4, max=100)
    @Column(name = "description")
    private String description;

    @NotNull
    @Column(name = "text")
    private String text;

    @Column(name = "image")
    private String userImage;

    @NotNull
    @Column(name = "rating_value")
    private Float ratingValue;

    @NotNull
    @Column(name = "publish_date")
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
    @JsonBackReference(value="news-comments")
    private Set<Comment> comments;

    @OneToMany(mappedBy = "news", cascade = CascadeType.ALL)
    private Set<Rating> rating;

    public News(String name, String description, String text, Float ratingValue) {
        this.name = name;
        this.description = description;
        this.text = text;
        this.ratingValue = ratingValue;
        this.publishDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm"));
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
