package com.spring.server.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;

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

    @ManyToMany(cascade = CascadeType.ALL)
    @JsonManagedReference
    @JoinTable(name = "news_tag", joinColumns = @JoinColumn(name = "id_news", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "id_tag", referencedColumnName = "id"))
    public Set<Tag> tags;

    @ManyToOne
    @JsonManagedReference
    @JoinColumn(name = "id_user")
    private User user;

    @OneToMany(mappedBy = "news", cascade = CascadeType.ALL)
    @JsonBackReference
    private Set<Comment> comments;

    @OneToMany(mappedBy = "news", cascade = CascadeType.ALL)
    @JsonBackReference
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
