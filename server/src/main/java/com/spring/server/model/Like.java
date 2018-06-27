package com.spring.server.model;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@EqualsAndHashCode
@ToString
@NoArgsConstructor
@Table(name="lois")
public class Like {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

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
    @JoinColumn(name = "id_comment")
    private Comment comment;
    public Comment getComment() {
        return this.comment;
    }
    public void setComment(Comment comment) {
        this.comment = comment;
    }

    public Like(User user, Comment comment){
        this.user = user;
        this.comment = comment;
    }
}
