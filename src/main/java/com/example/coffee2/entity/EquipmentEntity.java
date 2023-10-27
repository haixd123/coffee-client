package com.example.coffee2.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "equipment")
public class EquipmentEntity {
    @Id
    @SequenceGenerator(name = "equipment_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "equipment_seq")

    private Long id;

    @Column(name = "model")
    private String model;

    @Column(name = "name")
    private String name;

    @Column(name = "brand")
    private String brand;

    @Column(name = "power")
    private String power;

    @Column(name = "price")
    private Double price;

    @Column(name = "capacity")
    private String capacity;

    @Column(name = "description")
    private String description;

    @Column(name = "status")
    private Long status;

}
