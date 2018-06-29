package com.spring.server.model;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@EqualsAndHashCode
@ToString
@NoArgsConstructor
public class Theme {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "name")
    private String name;

//    @JsonManagedReference
//    @JsonIgnore
//    @OneToMany(mappedBy = "theme", cascade = CascadeType.ALL)
//    private Set<User> users;

    public Theme(String name){
        this.name = name;
    }
}
