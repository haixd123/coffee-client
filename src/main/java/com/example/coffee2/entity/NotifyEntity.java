package com.example.coffee2.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "notify")
public class NotifyEntity {
    @Id
    @SequenceGenerator(name = "notify_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "notify_seq")
    private Long id;

    @Column(name = "user_id")
    private String userId;

    @Column(name = "post_id")
    private String postId;

    @Column(name = "comment_id")
    private String commentId;

    @Column(name = "create_at")
    private String createAt;

}
