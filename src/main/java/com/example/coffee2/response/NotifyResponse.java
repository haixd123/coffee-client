package com.example.coffee2.response;

import lombok.Data;

@Data
public class NotifyResponse {
    private Long id;
    private String fromUser;
    private String isCommentPost;
    private String isReplyComment;
    private String postImage;
    private String createAt;
}
