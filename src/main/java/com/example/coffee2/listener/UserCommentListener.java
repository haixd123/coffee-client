package com.example.coffee2.listener;

import com.example.coffee2.entity.Notification;
import com.example.coffee2.entity.PostsEntity;
import com.example.coffee2.entity.UserEntity;
import com.example.coffee2.event.UserCommentEvent;
import com.example.coffee2.reponsitory.NotificationRepository;
import com.example.coffee2.reponsitory.PostsRepository;
import com.example.coffee2.reponsitory.UserRespository;
import com.example.coffee2.response.NotificationResponse;
import com.example.coffee2.utils.Constants;
import com.example.coffee2.utils.DateProc;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.Objects;

@Component
@RequiredArgsConstructor
public class UserCommentListener {


    private final SimpMessagingTemplate messagingTemplate;

    private final PostsRepository postsRepository;

    private final UserRespository userRespository;
    private final NotificationRepository notificationRepository;

    @EventListener
    public void userCommentPost(UserCommentEvent userCommentEvent) {
        Long postId = userCommentEvent.getData().getPostId();
        Long fromUserId = userCommentEvent.getData().getFromUser();
        Long replyUserId = userCommentEvent.getData().getReplyUser();

        Notification notification = new Notification();
        PostsEntity postsEntity = postsRepository.findById(postId).orElseThrow(() -> new UsernameNotFoundException("Post not found by id" + postId + "!"));
        UserEntity userEntity = userRespository.findById(postsEntity.getUserId()).orElseThrow(() -> new UsernameNotFoundException("Author not found!"));
        UserEntity fromUser = userRespository.findById(fromUserId).orElseThrow(() -> new UsernameNotFoundException("User comment not found"));

        if (replyUserId != null) {
            UserEntity replyUser = userRespository.findById(replyUserId).orElseThrow(() -> new UsernameNotFoundException("User reply not found"));
            notification.setUser(replyUser);
            notification.setFromUser(fromUser.getName());
            notification.setContent(String.format("đã nhắc đến bạn trong một bình luận.", fromUser.getName()));
        } else {
            if (Objects.equals(fromUser.getId(), postsEntity.getUserId())) {
                return;
            }
            notification.setUser(userEntity);
            notification.setFromUser(fromUser.getName());
            notification.setContent(String.format("vừa bình luận bài viết của bạn.", fromUser.getName()));
        }
        notification.setReaded(false);
        notification.setNotificationType(Constants.NOTIFICATION_USER_COMMENT_POST_TYPE);
        notification.setPostId(postId);
        Notification savedNotification = notificationRepository.save(notification);

        NotificationResponse notificationResponse = new NotificationResponse();
        notificationResponse.setPostId(postId);

        notificationResponse.setCreatedAt(DateProc.dateToStringDDMMYYYYMMSS(new Date()));

        notificationResponse.setContent(savedNotification.getContent());
        notificationResponse.setFromUser(savedNotification.getFromUser());
        notificationResponse.setUsername(savedNotification.getUser().getUserName());
        notificationResponse.setReaded(false);
        notificationResponse.setCreatedAt(String.valueOf(savedNotification.getCreatedAt()));
        messagingTemplate.convertAndSend("/notifications", notificationResponse);
    }
}
