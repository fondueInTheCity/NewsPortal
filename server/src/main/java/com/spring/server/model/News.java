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

    @Column(name = "publishDate")
    private Date publishDate;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "news_tag", joinColumns = @JoinColumn(name = "id_news", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "id_tag", referencedColumnName = "id"))
    public Set<Tag> tags;
    public Set<Tag> getTag() {
        return tags;
    }
    public void setTag(Set<Tag> tags){
        this.tags = tags;
    }

    @ManyToOne
    @JoinColumn(name = "id_user")
    private User user;
    public User getUser() {
        return this.user;
    }
    public void setUser(User user) {
        this.user = user;
    }

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

    public News(String name, String description, String text) {
        this.name = name;
        this.description = description;
        this.text = text;
        this.publishDate = new Date();
    }
}
