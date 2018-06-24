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

    @ManyToOne
    @JoinColumn(name = "news_id")
    private News news;
    public News getNews() {
        return this.news;
    }
    public void setNews(News news) {
        this.news = news;
    }

    public Rating(long user_id, int value) {
        this.user_id = user_id;
        this.value = value;
    }
}
