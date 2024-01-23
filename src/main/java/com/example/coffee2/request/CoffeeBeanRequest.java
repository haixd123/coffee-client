package com.example.coffee2.request;

import lombok.Data;

@Data
public class CoffeeBeanRequest {
    private Long id;
    private String name;
    private String title;
    private String popular;
    private String description;
    private String origin;
    private String plantingInstructions;
    private Long status;
    private String contentCoffee;
    private String image;

    private int pageIndex;
    private int pageSize;
}
