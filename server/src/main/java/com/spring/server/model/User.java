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

    @Column(name = "activateCode")
    private String activationCode;

    public User(String username, String password, String firstName, String lastName, String email) {
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.role = UserRole.ROLE_READER;
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
