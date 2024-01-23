package com.example.coffee2.response;

import lombok.Data;

@Data
public class LikePostsResponse {
    private Long id;
    private Long userId;
    private Long postId;
    private Long isLike;
}
