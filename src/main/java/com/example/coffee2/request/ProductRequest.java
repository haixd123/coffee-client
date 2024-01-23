package com.example.coffee2.request;

import lombok.Data;

import javax.persistence.Column;

@Data
public class ProductRequest {
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
    private int sortPriceDown;
    private int sortPriceUp;
    private int sortDiscountDown;
    private int sortDiscountUp;
    private int sortRemainingDown;
    private int sortRemainingUp;
    private String detail;

    private int pageIndex;
    private int pageSize;
}
