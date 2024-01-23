package com.example.coffee2.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "product")
public class ProductEntity {
    @Id
    @SequenceGenerator(name = "product_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "product_seq")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "sku")
    private String sku;

    @Column(name = "price")
    private Long price;

    @Column(name = "category")
    private String category;

    @Column(name = "discount")
    private Long discount;

    @Column(name = "remaining")
    private Long remaining;

    @Column(name = "image")
    private String image;

    @Column(name = "status")
    private Long status;

    @Column(name = "detail")
    private String detail;
}
