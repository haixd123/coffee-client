package com.example.coffee2.controller;

import com.example.coffee2.entity.Notification;
import com.example.coffee2.entity.PostsEntity;
import com.example.coffee2.entity.UserEntity;
import com.example.coffee2.reponsitory.NotificationRepository;
import com.example.coffee2.reponsitory.PostsRepository;
import com.example.coffee2.reponsitory.UserRespository;
import com.example.coffee2.response.NotificationResponse;
import com.example.coffee2.response.base.ApiBaseResponse;
import com.example.coffee2.service.user.UserService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@Log4j2
@RequestMapping("api")
public class NotificationController {

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private UserRespository userRespository;

    @Autowired
    private PostsRepository postsRepository;

    @GetMapping("/authors/notifications/{userId}")
    public ResponseEntity<?> getAllNotificationByUser(@PathVariable(name = "userId") Long userId) {
        try {
            UserEntity user = userRespository.findById(userId).orElse(null);
            List<Notification> notifications = notificationRepository.findAllByUser(user);
            List<NotificationResponse> notificationResponses = notifications.stream().map((n) -> {
                PostsEntity postsEntity = postsRepository.findById(n.getPostId()).orElse(null);
                NotificationResponse notificationResponse = new NotificationResponse();
                notificationResponse.setCreatedAt(String.valueOf(n.getCreatedAt()));
                notificationResponse.setUsername(n.getUser().getUserName());
                notificationResponse.setReaded(n.isReaded());
                notificationResponse.setId(n.getId());
                notificationResponse.setPostId(n.getPostId());
                notificationResponse.setContent(n.getContent());
                notificationResponse.setFromUser(n.getFromUser());
                if (postsEntity != null) {
                    notificationResponse.setPostCategory(postsEntity.getCategory());
                }
                return notificationResponse;
            }).collect(Collectors.toList());
            return new ResponseEntity<>(notificationResponses, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getCause(), HttpStatus.BAD_REQUEST);
        }
    }
}
