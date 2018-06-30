package com.spring.server.model;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@EqualsAndHashCode
@ToString
@NoArgsConstructor
public class Language {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "name")
    private String name;

//    @JsonManagedReference
//    @JsonIgnore
//    @OneToMany(mappedBy = "language", cascade = CascadeType.ALL)
//    private Set<User> users;

    public Language(String name){
        this.name = name;
    }
}
