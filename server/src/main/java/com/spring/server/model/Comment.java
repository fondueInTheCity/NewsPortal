package com.spring.server.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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

    @Column(name = "text")
    private String text;

    @ManyToOne
    @JoinColumn(name = "id_user")
    private User user;
    public User getUser() {
        return this.user;
    }
    public void setUser(User user) {
        this.user = user;
    }

    @ManyToOne
    @JoinColumn(name = "id_news")
    @JsonBackReference
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

    public Comment(String text, News news) {
        this.text = text;
        this.news = news;
    }
}
