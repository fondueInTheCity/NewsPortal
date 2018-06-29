package com.spring.server.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;

import javax.persistence.*;
import java.util.Set;

@Entity
@Getter
@Setter
@EqualsAndHashCode
@ToString
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "firstName")
    private String firstName;

    @Column(name = "lastName")
    private String lastName;

    @Column(name = "email")
    private String email;

    @Column
    @Enumerated(EnumType.STRING)
    private UserRole role;

    @Column(name = "activationCode")
    private String activationCode;

    @Column(name = "country")
    private String country;

    @Column(name = "city")
    private String city;

    @Column(name = "bio")
    private String bio;

    @Column(name = "avatar")
    private String avatar;

    @Column(name ="isActive")
    private Boolean isActive;

    @Column(name = "isBlocked")
    private boolean isBlocked;

    @Column(name = "isDeleted")
    private boolean isDeleted;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private Set<News> news;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private Set<Like> likes;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private Set<Comment> comments;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private Set<Rating> ratings;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "id_language")
    private Language language;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "id_theme")
    private Theme theme;

    public User(String username, String password, String email) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.role = UserRole.ROLE_READER;
        this.isBlocked = false;
        this.isDeleted = false;
        this.isActive = true;
        this.language.setId(Long.parseLong("3"));
        this.theme.setId(Long.parseLong("1"));
    }

    public void applyChanges(final User inUser) {
        this.setUsername(inUser.getUsername());
        this.setPassword(inUser.getPassword());
        this.setFirstName(inUser.getFirstName());
        this.setLastName(inUser.getLastName());
        this.setEmail(inUser.getEmail());
        this.setRole(inUser.getRole());
    }
}
