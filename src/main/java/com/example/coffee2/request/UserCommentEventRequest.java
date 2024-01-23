package com.example.coffee2.request;

import lombok.Data;

@Data
public class UserCommentEventRequest {
    private Long fromUser;

    private Long postId;

    private Long replyUser;
}
