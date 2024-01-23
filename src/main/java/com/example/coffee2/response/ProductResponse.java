package com.example.coffee2.response;

import lombok.Data;

@Data
public class ProductResponse {
    private Long id;
    private String name;
    private String description;
    private String sku;
    private Long price;
    private String category;
    private Long discount;
    private Long remaining;
    private String image;
    private Long status;
    private String detail;

}
