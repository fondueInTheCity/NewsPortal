package com.spring.server.model;

import lombok.*;

import javax.persistence.*;
import java.util.Set;

@Entity
@Getter
@Setter
@EqualsAndHashCode
@ToString
@NoArgsConstructor
public class Tag {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "name")
    private String name;

    @ManyToMany(mappedBy = "tags")
    public Set<News> news;
    public void setNews(Set<News> news)
    {
        this.news = news;
    }
    public Set<News> getNews() {
        return this.news;
    }

    public Tag(String name) {
        this.name = name;
    }
}
