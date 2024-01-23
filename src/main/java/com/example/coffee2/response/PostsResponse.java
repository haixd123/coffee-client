package com.example.coffee2.response;

import lombok.Data;

import java.util.Date;

@Data
public class PostsResponse {
    private Long id;
    private Long like1;
    private Long comment;
    private String title;
    private String contentPost;
    private String contentDetail;
    private Long status;
    private String imagePath;
    private Long userId;
    private String createdAt;
    private String updatedAt;
    private String category;

}
