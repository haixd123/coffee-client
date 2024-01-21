package com.example.coffee2.response;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class NotificationResponse {
    private Long id;
    private String username;
    private Long postId;
    private String content;
    private boolean readed;
    private int notificationType;

    private String fromUser;

    private String postCategory;

//    private LocalDateTime createdAt;
    private String createdAt;
}
