package com.example.coffee2.response;

import lombok.Data;

@Data
public class WebSocketResponse {

    private String userId;
    private String postId;
    private String content;
    private String isLike;

}
