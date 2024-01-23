package com.example.coffee2.pusher;

import com.example.coffee2.event.UserCommentEvent;
import com.example.coffee2.request.UserCommentEventRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserCommentPusher {

    private final ApplicationEventPublisher publisher;

    public void pushCommentNotificationForUser(UserCommentEventRequest userCommentEventRequest) {
        publisher.publishEvent(new UserCommentEvent(this, userCommentEventRequest));
    }
}
