package com.example.coffee2.entity;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Data
@Table(name = "notifications")
public class Notification {

    @javax.persistence.Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    private String content;
    @ManyToOne
    private UserEntity user;

    private String fromUser;

    private boolean readed;
    private int notificationType;

    private Long postId;
//    @CreationTimestamp
//    private LocalDateTime createdAt;
    private Date createdAt;
}
