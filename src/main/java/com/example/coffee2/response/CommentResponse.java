package com.example.coffee2.response;

import lombok.Data;

@Data
public class CommentResponse {
    private Long id;
    private Long commentId;
    private Long userId;
    private Long postId;
    private String commentText;
    private String createAt;
    private String updateAt;
    private Long likeComment;
    private Long status;
}
