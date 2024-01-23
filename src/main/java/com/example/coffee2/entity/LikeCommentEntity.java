//package com.example.coffee2.entity;
//
//
//import lombok.Data;
//
//import javax.persistence.*;
//
//@Entity
//@Data
//@Table(name = "like_comments")
//public class LikeCommentEntity {
//    @Id
//    @SequenceGenerator(name = "like_comment_seq", allocationSize = 1)
//    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "like_comment_seq")
//    private Long id;
//
//    @Column(name = "comment_id")
//    private Long commentId;
//
//    @Column(name = "user_id")
//    private Long userId;
//
//    @Column(name = "is_like_comment")
//    private Long isLikeComment;
//
//    @Column(name = "post_id")
//    private Long postId;
//}
