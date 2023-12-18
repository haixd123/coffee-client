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

    @Column(name = "name")
    private String name;

    @Column(name = "title")
    private String title;

    @Column(name = "content_equipment")
    private String contentEquipment;

    @Column(name = "image")
    private String image;

    @Column(name = "status")
    private Long status;


}
