package com.example.coffee2.event;

import com.example.coffee2.request.UserCommentEventRequest;
import org.springframework.context.ApplicationEvent;

public class UserCommentEvent extends ApplicationEvent {
    private UserCommentEventRequest data;

    public UserCommentEvent(Object source, UserCommentEventRequest request) {
        super(source);
        this.data = request;
    }

    public UserCommentEventRequest getData() {
        return data;
    }
}
