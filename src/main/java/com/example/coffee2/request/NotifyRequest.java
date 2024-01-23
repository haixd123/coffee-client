package com.example.coffee2.request;

import lombok.Data;

@Data
public class NotifyRequest {
    private Long id;
    private String userId;
    private String postId;
    private String commentId;
    private String createAt;
}
