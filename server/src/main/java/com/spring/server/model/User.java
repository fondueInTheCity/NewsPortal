package com.spring.server.model;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

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

    @Column(name = "isBlocked")
    private boolean isBlocked;

    @Column(name = "isDeleted")
    private boolean isDeleted;

    public User(String username, String password, String email) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.role = UserRole.Reader;//.ROLE_READER;
        this.isBlocked = false;
        this.isDeleted = false;
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
