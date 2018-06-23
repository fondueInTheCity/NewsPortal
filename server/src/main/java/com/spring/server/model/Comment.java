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
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "user_id")
    private long user_id;
    public void setUser_id(long user_id)
    {
        this.user_id = user_id;
    }
    public long getUser_id()
    {
        return user_id;
    }

    @Column(name = "text")
    private String text;

    @ManyToOne
    @JoinColumn(name = "news_id")
    private News news;
    public News getNews() {
        return this.news;
    }
    public void setNews(News news) {
        this.news = news;
    }

    @OneToMany(mappedBy = "comment", cascade = CascadeType.ALL)
    private Set<Like> likes;
    public Set<Like> getLikes() {
        return this.likes;
    }
    public void setLikes(Set<Like> likes) {
        this.likes = likes;
    }

    public Comment(long user_id, String text, News news) {
        this.user_id = user_id;
        this.text = text;
        this.news = news;
    }
}
