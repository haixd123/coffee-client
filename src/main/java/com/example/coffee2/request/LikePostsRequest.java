package com.example.coffee2.request;

import lombok.Data;

@Data
public class LikePostsRequest {
    private Long userId;
    private Long postId;
    private Long isLike;

    private int pageIndex;
    private int pageSize;
}
