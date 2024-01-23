package com.example.coffee2.entity;


import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "like_posts")
public class LikePostsEntity {
    @Id
    @SequenceGenerator(name = "like_posts_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "like_posts_seq")
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "post_id")
    private Long postId;

    @Column(name = "is_like")
    private Long isLike;

}
