package com.spring.server.model;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@EqualsAndHashCode
@ToString
@NoArgsConstructor
public class Like {

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

    @ManyToOne
    @JoinColumn(name = "comment_id")
    private Comment comment;
    public Comment getComment() {
        return this.comment;
    }
    public void setComment(Comment comment) {
        this.comment = comment;
    }

    public Like(long user_id) {
        this.user_id = user_id;
    }
}
