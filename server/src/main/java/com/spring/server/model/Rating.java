package com.spring.server.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Rating {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @Min(0)
    @Max(5)
    @Column(name = "value")
    private int value;

    @ManyToOne
    @JoinColumn(name = "id_user")
    private User user;

    @ManyToOne
    @JsonBackReference(value = "rating-news")
    @JoinColumn(name = "id_news")
    private News news;

    @Override
    public String toString() {
        return "Rating{" +
                "id=" + id +
                ", value='" + value + '\'' +
                '}';
    }
}
