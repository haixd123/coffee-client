package com.example.coffee2.request;

import lombok.Data;

@Data
public class WebSocketRequest {
    private String userId;
    private String postId;
    private String content;
    private String isLike;
}
