package com.example.coffee2.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.support.DefaultHandshakeHandler;

import java.nio.file.attribute.UserPrincipal;
import java.security.Principal;
import java.util.Map;
import java.util.UUID;

@Slf4j
public class UserHandleHaske extends DefaultHandshakeHandler {
    @Override
    protected Principal determineUser(ServerHttpRequest request, WebSocketHandler wsHandler, Map<String, Object> attributes) {
        final String randomId = UUID.randomUUID().toString();
        log.info("Logged with user id" + randomId);
        return new UserPrincipal() {
            @Override
            public String getName() {
                return randomId;
            }
        };
    }
}
