package com.spring.server.model;

import lombok.*;

import javax.persistence.*;

//com.spring.server.model.User

@Entity
@Getter
@Setter
@EqualsAndHashCode
@ToString
@NoArgsConstructor
public class Rating {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "value")
    private int value;

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
    private News news;
    public News getNews() {
        return this.news;
    }
    public void setNews(News news) {
        this.news = news;
    }

    public Rating(int value) {
        this.value = value;
    }
}
