package com.example.coffee2.request;

import lombok.Data;

@Data
public class SavePostsRequest {
    private Long id;
    private Long userId;
    private Long postId;
    private Long isSave;
//    private Long status;

    private int pageIndex;
    private int pageSize;
}
