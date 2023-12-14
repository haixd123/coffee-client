package com.example.coffee2.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "coffee_bean")
public class CoffeeBeanEntity {
    @Id
    @SequenceGenerator(name = "coffee_bean_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "coffee_bean_seq")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "title")
    private String title;

    @Column(name = "popular")
    private String popular;

    @Column(name = "description")
    private String description;

    @Column(name = "origin")
    private String origin;

    @Column(name = "planting_instructions")
    private String plantingInstructions;


    @Column(name = "status")
    private Long status;

    @Column(name = "content_coffee")
    private String contentCoffee;

    @Column(name = "image")
    private String image;

//    @Column(name = "slug")
//    private Long slug;

}
