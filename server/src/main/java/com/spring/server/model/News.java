package com.spring.server.model;

import lombok.*;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
@Getter
@Setter
@EqualsAndHashCode
@ToString
@NoArgsConstructor
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

    @Column(name = "publishDate")
    private Date publishDate;

    @OneToMany(mappedBy = "news", cascade = CascadeType.ALL)
    private Set<Comment> comments;
    public Set<Comment> getComments() {
        return this.comments;
    }
    public void setComments(Set<Comment> comments) {
        this.comments = comments;
    }

    @OneToMany(mappedBy = "news", cascade = CascadeType.ALL)
    private Set<Rating> rating;
    public Set<Rating> getRatings() {
        return this.rating;
    }
    public void setRatings(Set<Rating> rating) {
        this.rating = rating;
    }

    public News(String name, String description, long user_id, String text) {
        this.name = name;
        this.description = description;
        this.user_id = user_id;
        this.text = text;
        this.publishDate = new Date();
    }
}
