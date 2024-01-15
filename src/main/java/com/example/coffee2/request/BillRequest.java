package com.example.coffee2.request;

import lombok.Data;

@Data
public class BillRequest {
    private Long id;
    private String name;
    private String email;
    private String phone;
    private String address;
    private String detail;
    private String createDate;
    private String total;

    private int pageIndex;
    private int pageSize;
}
