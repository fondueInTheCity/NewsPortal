package com.spring.server.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

//com.spring.server.model.User

@Entity
@Getter
@Setter
public class Rating {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "value")
    private int value;

    @ManyToOne
    @JoinColumn(name = "id_user")
    private User user;

    @ManyToOne
    @JsonBackReference(value = "rating-news")
    @JoinColumn(name = "id_news")
    private News news;

    public Rating(int value) {
        this.value = value;
    }
    public Rating() {

    }

    @Override
    public String toString() {
        return "Rating{" +
                "id=" + id +
                ", value='" + value + '\'' +
                '}';
    }
}
