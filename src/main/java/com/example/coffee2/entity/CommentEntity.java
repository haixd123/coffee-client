package com.example.coffee2.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "comment")
public class CommentEntity {
    @Id
    @SequenceGenerator(name = "comment_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "comment_seq")
    private Long id;

    @Column(name = "comment_id")
    private Long commentId;

    @Column(name = "user_id")
    private Long userId;
    @Column(name = "post_id")
    private Long postId;
    @Column(name = "comment_text")
    private String commentText;
    @Column(name = "create_at")
    private String createAt;
    @Column(name = "update_at")
    private String updateAt;
    @Column(name = "like_comment")
    private Long likeComment;
    @Column(name = "status")
    private Long status;
}
