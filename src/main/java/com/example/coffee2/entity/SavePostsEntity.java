package com.example.coffee2.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "save_posts")
public class SavePostsEntity {
    @Id
    @SequenceGenerator(name = "save_posts_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "save_posts_seq")
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "post_id")
    private Long postId;

    @Column(name = "is_save")
    private Long isSave;

}
