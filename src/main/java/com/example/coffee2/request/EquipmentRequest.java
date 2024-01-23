package com.example.coffee2.request;

import lombok.Data;

@Data
public class EquipmentRequest {
    private Long id;
    private String name;
    private String title;
    private String contentEquipment;
    private String power;
    private Long price;
    private String image;
    private String description;
    private Long status;


    private int pageIndex;
    private int pageSize;
}
