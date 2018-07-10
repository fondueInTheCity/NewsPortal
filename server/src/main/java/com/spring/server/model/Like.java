package com.spring.server.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name="lois")
public class Like {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_user")
    private User user;

    @ManyToOne
    @JsonManagedReference
    @JoinColumn(name = "id_comment")
    private Comment comment;

    public Like(User user, Comment comment){
        this.user = user;
        this.comment = comment;
    }

    public Like(){
    }

    @Override
    public String toString() {
        return "Like{" +
                "id=" + id +
                '}';
    }
}
