package com.example.coffee2.request;

import lombok.Data;

@Data
public class CommentRequest {
    private Long id;
    private Long replyCommentId;
    private Long commentId;
    private Long userId;
    private Long postId;
    private String commentText;
    private String createAt;
    private String updateAt;
    private Long likeComment;
    private Long status;

    private int pageIndex;
    private int pageSize;
}
