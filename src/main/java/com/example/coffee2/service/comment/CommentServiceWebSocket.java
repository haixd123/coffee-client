package com.example.coffee2.service.comment;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class CommentServiceWebSocket {
    private final SimpMessagingTemplate messagingTemplate;

    public CommentServiceWebSocket(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    public void sendComment(String comment) {
        messagingTemplate.convertAndSend("/api/authors/topic/comments", comment);
    }
}
