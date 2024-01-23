package com.example.coffee2.request;

import lombok.Data;

import java.sql.Blob;

@Data
public class UserRequest {
    private Long id;
    private String userName;
    private String passWord;
    private String email;
    private String name;
    private String address;
    private Long age;
    private String role;
    private Long phoneNumber;
    private String dateOfBirth;
    private Long sex;
    private String createDate;
    private Long status;
    private String image;
//    private String data;
//    private byte[] data;

    private int pageIndex;
    private int pageSize;
}
