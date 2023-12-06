package com.example.coffee2.controller;

import com.example.coffee2.request.WebSocketRequest;
import com.example.coffee2.response.WebSocketResponse;
import com.example.coffee2.service.comment.CommentServiceWebSocket;
import lombok.extern.log4j.Log4j2;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Log4j2
@Controller
//@CrossOrigin(origins = "http://localhost:4200")
public class WebSocketController {

    private final CommentServiceWebSocket commentServiceWebSocket;

    public WebSocketController(CommentServiceWebSocket commentServiceWebSocket) {
        this.commentServiceWebSocket = commentServiceWebSocket;
    }

//    @MessageMapping("/send-comment")
    @MessageMapping("/api/authors/send-comment")
//    @SendTo("/topic/comments")
    @SendTo("/api/authors/topic/comments")
    public String sendComment(String comment) {
        commentServiceWebSocket.sendComment(comment);
        return comment;
    }


//    @MessageMapping("/send-comment")
//    @SendTo("/topic/comments")
//    public WebSocketResponse sendMessage(WebSocketRequest request) {
//        log.info("request: " + request);
//        WebSocketResponse webSocketResponse = new WebSocketResponse();
//        webSocketResponse.setUserId(request.getUserId());
//        webSocketResponse.setPostId(request.getPostId());
//        webSocketResponse.setContent(request.getContent());
//        webSocketResponse.setIsLike(request.getIsLike());
//        log.info("webSocketResponse: " + webSocketResponse);
//        return webSocketResponse;
//    }
}
