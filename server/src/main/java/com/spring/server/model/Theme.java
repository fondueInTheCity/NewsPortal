package com.spring.server.model;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class Theme {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "name")
    private String name;

    public Theme(String name){
        this.name = name;
    }
    public Theme(){
    }
}
