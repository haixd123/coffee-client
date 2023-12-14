package com.example.coffee2.response;

import lombok.Data;

@Data
public class BillResponse {
    private Long id;
    private String name;
    private String email;
    private String phone;
    private String address;
    private String detail;
}
