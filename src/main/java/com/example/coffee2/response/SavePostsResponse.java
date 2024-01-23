package com.example.coffee2.response;

import lombok.Data;
@Data
public class SavePostsResponse {
    private Long id;
    private Long userId;
    private Long postId;
    private Long isSave;

}
