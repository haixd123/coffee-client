package com.example.coffee2.request;

import lombok.Data;

@Data
public class EquipmentRequest {
    private Long id;
    private String model;
    private String name;
    private String brand;
    private String power;
    private Long price;
    private String capacity;
    private String description;
    private Long status;

    private int pageIndex;
    private int pageSize;
}
